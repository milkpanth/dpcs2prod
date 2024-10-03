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
exports.SlidesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const app_logger_1 = require("../../shared/app-logger");
const db_1 = require("../../shared/constants/db");
const database_type_enum_1 = require("../../shared/enum/database-type.enum");
const entity_helper_1 = require("../../utils/entity-helper");
const language_helper_1 = require("../../utils/language-helper");
const pagination_1 = require("../../utils/pagination");
const slidetag_entity_1 = require("../slidetags/entities/slidetag.entity");
const slide_entity_1 = require("./entities/slide.entity");
let SlidesRepository = class SlidesRepository {
    constructor(useSlideRepo, liveSlideRepo, logger) {
        this.useSlideRepo = useSlideRepo;
        this.liveSlideRepo = liveSlideRepo;
        this.logger = logger;
        this.logger.setContext("SlidesRepository");
    }
    async findOneWithWhereConditions(whereConditions, databaseType, relations) {
        this.logger.log(`findOneWithWhereConditions --> DB`, {
            whereConditions: whereConditions,
            databaseType: databaseType,
            relations: relations,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSlideRepo;
        }
        else {
            repo = this.liveSlideRepo;
        }
        const result = await repo.findOne({
            relations: relations,
            where: whereConditions,
        });
        this.logger.log(`DB --> findOneWithWhereConditions`, JSON.stringify(result));
        return result;
    }
    async insertOrUpsert(slide, databaseType) {
        this.logger.log(`insertOrUpsert --> DB`, {
            slide: slide,
            databaseType: databaseType,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSlideRepo;
        }
        else {
            repo = this.liveSlideRepo;
        }
        const result = await repo.save(slide);
        this.logger.log(`DB --> insertOrUpsert`, JSON.stringify(result));
        return result;
    }
    async findAll(queryPayload, graphUser, databaseType) {
        this.logger.log(`findAll --> DB`, {
            queryPayload: queryPayload,
            databaseType: databaseType,
        });
        let repo;
        const languageList = (0, language_helper_1.getLanguageList)(graphUser.user.Country, graphUser.user.Type);
        const languageFilter = queryPayload.languages
            ? languageList.filter((l) => queryPayload.languages.includes(l))
            : languageList;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSlideRepo;
        }
        else {
            repo = this.liveSlideRepo;
        }
        const sectionFilter = queryPayload.sectionIDs && queryPayload.sectionIDs.length > 0
            ? {
                SectionID: (0, typeorm_2.In)(queryPayload.sectionIDs),
            }
            : {};
        let slideIds = [];
        if (queryPayload.tagIDs && queryPayload.tagIDs.length > 0) {
            const slideTagsRepo = this.useSlideRepo.manager.connection.getRepository(slidetag_entity_1.SlideTag);
            const slideTags = await slideTagsRepo.find({
                where: {
                    TagID: (0, typeorm_2.In)(queryPayload.tagIDs),
                },
                select: ["SlideID"],
            });
            slideIds = slideTags.map((st) => st.SlideID);
        }
        const result = await (0, nestjs_typeorm_paginate_1.paginate)(repo, (0, pagination_1.getBasePaginationOption)(queryPayload), {
            relations: {
                Section: true,
                Tags: true,
                SlideFiles: true,
            },
            where: Object.assign(Object.assign(Object.assign(Object.assign({ CompanyCode: queryPayload.company || (0, typeorm_2.IsNull)() }, (0, pagination_1.getBaseWhereOption)(queryPayload, {
                DisplayName: (0, typeorm_2.Like)(`%${(0, entity_helper_1.escapeLikeString)(queryPayload.keyword)}%`),
            })), { SlideFiles: [
                    {
                        Language: (0, typeorm_2.In)(languageFilter),
                    },
                    {
                        FileID: (0, typeorm_2.IsNull)(),
                    },
                ], Section: sectionFilter }), (slideIds.length > 0 ? { SlideID: (0, typeorm_2.In)(slideIds) } : {})), (0, pagination_1.getBaseStatusOption)(queryPayload)),
            order: (0, pagination_1.getBaseOrderingOption)(queryPayload),
        });
        this.logger.log(`DB --> findAll`, JSON.stringify(result));
        return result;
    }
};
SlidesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(slide_entity_1.Slide, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(slide_entity_1.Slide, db_1.LIVE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        app_logger_1.AppLoggerService])
], SlidesRepository);
exports.SlidesRepository = SlidesRepository;
//# sourceMappingURL=slides.repository.js.map