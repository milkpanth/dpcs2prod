"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentListsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const db_1 = require("../../shared/constants/db");
const UserTypeEnum_enum_1 = require("../../shared/enum/UserTypeEnum.enum");
const language_helper_1 = require("../../utils/language-helper");
const model_entity_1 = require("../models/entities/model.entity");
const slidefile_entity_1 = require("../slidefiles/entities/slidefile.entity");
let EquipmentListsService = class EquipmentListsService {
    constructor(modelsRepository, slideFilesRepository) {
        this.modelsRepository = modelsRepository;
        this.slideFilesRepository = slideFilesRepository;
    }
    async getMatchResult(graphUser, requestEquipments) {
        const resultObject = {
            equipData: [],
            languageList: (0, language_helper_1.getLanguageList)(graphUser.user.Country),
        };
        const matchModels = await this.modelsRepository.find({
            where: {
                Name: (0, typeorm_2.In)(requestEquipments.map((e) => e.module)),
            },
        });
        for (const re of requestEquipments) {
            const model = matchModels.find((m) => m.Name == re.module);
            const matchResult = Object.assign(Object.assign({}, re), { globalModelSlides: [], localModelSlides: [], globalSeriesSlides: [], localSeriesSlides: [], modelExist: false });
            if (model) {
                const modelSlides = await this.slideFilesRepository.find({
                    relations: {
                        Slide: {
                            Tags: true,
                            Section: {
                                Category: true,
                            },
                        },
                    },
                    where: {
                        Slide: [UserTypeEnum_enum_1.UserTypeEnum.LOCALADMIN, UserTypeEnum_enum_1.UserTypeEnum.LOCALUSER].includes(graphUser.user.Type)
                            ? {
                                Tags: {
                                    Name: (0, typeorm_2.In)([model.Name, "Models"]),
                                },
                                CompanyCode: graphUser.user.CompanyCode,
                            }
                            : {
                                Tags: {
                                    Name: (0, typeorm_2.In)([model.Name, "Models"]),
                                },
                            },
                        Language: [UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN].includes(graphUser.user.Type)
                            ? undefined
                            : (0, typeorm_2.In)(resultObject.languageList),
                    },
                });
                matchResult.modelExist = true;
                const filteredModelSlides = modelSlides.filter((s) => {
                    let mtFlag = false;
                    let ntFlag = false;
                    for (const t of s.Slide.Tags) {
                        if (t.Name == "Models") {
                            mtFlag = true;
                        }
                        if (t.Name == model.Name) {
                            ntFlag = true;
                        }
                        if (mtFlag && ntFlag) {
                            return true;
                        }
                    }
                    return false;
                });
                matchResult.globalModelSlides = filteredModelSlides.filter((s) => !s.Slide.CompanyCode);
                matchResult.localModelSlides = filteredModelSlides.filter((s) => s.Slide.CompanyCode &&
                    [UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN].includes(graphUser.user.Type)
                    ? true
                    : resultObject.languageList.includes(s.Language));
                if (model.SeriesName) {
                    const seriesSlides = await this.slideFilesRepository.find({
                        relations: {
                            Slide: {
                                Tags: true,
                                Section: {
                                    Category: true,
                                },
                            },
                        },
                        where: {
                            Slide: [UserTypeEnum_enum_1.UserTypeEnum.LOCALADMIN, UserTypeEnum_enum_1.UserTypeEnum.LOCALUSER].includes(graphUser.user.Type)
                                ? {
                                    Tags: {
                                        Name: (0, typeorm_2.In)([model.SeriesName, "Series"]),
                                    },
                                    CompanyCode: graphUser.user.CompanyCode,
                                }
                                : {
                                    Tags: {
                                        Name: (0, typeorm_2.In)([model.SeriesName, "Series"]),
                                    },
                                },
                            Language: (0, typeorm_2.In)(resultObject.languageList),
                        },
                    });
                    const filteredSeriesSlides = seriesSlides.filter((s) => {
                        let stFlag = false;
                        let ntFlag = false;
                        for (const t of s.Slide.Tags) {
                            if (t.Name == "Series") {
                                stFlag = true;
                            }
                            if (t.Name == model.SeriesName) {
                                ntFlag = true;
                            }
                            if (stFlag && ntFlag) {
                                return true;
                            }
                        }
                        return false;
                    });
                    matchResult.globalSeriesSlides = filteredSeriesSlides.filter((s) => !s.Slide.CompanyCode);
                    matchResult.localSeriesSlides = filteredSeriesSlides.filter((s) => s.Slide.CompanyCode &&
                        [UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN].includes(graphUser.user.Type)
                        ? true
                        : resultObject.languageList.includes(s.Language));
                }
            }
            resultObject.equipData.push(matchResult);
        }
        return resultObject;
    }
};
EquipmentListsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(model_entity_1.Model, db_1.LIVE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(slidefile_entity_1.SlideFile, db_1.LIVE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EquipmentListsService);
exports.EquipmentListsService = EquipmentListsService;
//# sourceMappingURL=equipmentlists.service.js.map