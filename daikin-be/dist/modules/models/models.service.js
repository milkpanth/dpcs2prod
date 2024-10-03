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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exceljs_1 = require("exceljs");
const path_1 = require("path");
const typeorm_2 = require("typeorm");
const db_1 = require("../../shared/constants/db");
const database_type_enum_1 = require("../../shared/enum/database-type.enum");
const DataStateEnum_1 = require("../../shared/enum/DataStateEnum");
const before_update_status_inlive_1 = require("../../utils/before-update-status-inlive");
const before_update_status_inuse_1 = require("../../utils/before-update-status-inuse");
const validators_1 = require("../../utils/validators");
const image_entity_1 = require("../images/entities/image.entity");
const images_repository_1 = require("../images/images.repository");
const images_service_1 = require("../images/images.service");
const series_repository_1 = require("../series/series.repository");
const tag_entity_1 = require("../tags/entities/tag.entity");
const series_entity_1 = require("./../series/entities/series.entity");
const model_entity_1 = require("./entities/model.entity");
const model_repository_1 = require("./model.repository");
let ModelsService = class ModelsService {
    constructor(modelsRepository, seriesRepository, dataSource, imagesService, modelRepo, imageRepo, seriesRepo) {
        this.modelsRepository = modelsRepository;
        this.seriesRepository = seriesRepository;
        this.dataSource = dataSource;
        this.imagesService = imagesService;
        this.modelRepo = modelRepo;
        this.imageRepo = imageRepo;
        this.seriesRepo = seriesRepo;
    }
    async create(createArrayModelDto) {
        return await this.dataSource.transaction(async (manager) => {
            return Promise.all(createArrayModelDto.map(async (c) => {
                const createModal = await manager.save(model_entity_1.Model, Object.assign(Object.assign({}, c), { Use: c.SeriesName ? DataStateEnum_1.Use.New : DataStateEnum_1.Use.Broken, Live: DataStateEnum_1.Live.New }));
                let series = await manager.findOne(series_entity_1.Series, {
                    relations: {
                        Models: true,
                        Tag: true,
                    },
                    where: {
                        Name: c.SeriesName,
                    },
                });
                await manager.update(series_entity_1.Series, { Name: c.SeriesName }, {
                    Use: !c.SeriesName
                        ? (0, validators_1.getInUseStatusWithDeletedOrBroken)(series.Use)
                        : (0, validators_1.getInUseStatus)(series.Live, series.Use),
                    Live: (0, validators_1.getInLiveStatus)(series.Live),
                });
                const isTagExist = await manager.existsBy(tag_entity_1.Tag, {
                    Name: c.Name,
                });
                if (!isTagExist) {
                    await manager.save(tag_entity_1.Tag, {
                        Name: c.Name,
                        IsSeriesType: false,
                    });
                }
                return createModal;
            }));
        });
    }
    async findAll(queryPayload) {
        let models = await this.modelRepo.findAll(queryPayload, database_type_enum_1.DataBaseTypeEnum.USE);
        if (models.meta.totalItems > 0 && models.items.length === 0) {
            queryPayload.page = 1;
            models = await this.modelRepo.findAll(queryPayload, database_type_enum_1.DataBaseTypeEnum.USE);
        }
        return models;
    }
    findModelsByName(searchDto) {
        return this.modelsRepository.find({
            relations: {
                Series: {
                    Tag: true,
                },
                Image: true,
            },
            where: {
                Name: searchDto.exact
                    ? searchDto.keyword
                    : (0, typeorm_2.Like)(`%${searchDto.keyword}%`),
            },
        });
    }
    async validateModel(validateDto) {
        const { ModelName, SeriesName } = validateDto;
        let matchModel = null;
        let matchSeries = null;
        if (ModelName) {
            matchModel = await this.modelsRepository.findOne({
                relations: {
                    Series: {
                        Tag: true,
                    },
                },
                where: {
                    Name: ModelName,
                },
            });
        }
        if (SeriesName) {
            matchSeries = await this.seriesRepository.findOne({
                relations: {
                    Tag: true,
                },
                where: {
                    Name: SeriesName,
                },
            });
        }
        return { matchModel, matchSeries };
    }
    async update(updateArrayModelDto) {
        return await this.dataSource.transaction(async (manager) => {
            return await Promise.all(updateArrayModelDto.map(async (d) => {
                const { NewName, IsEOL, SeriesName } = d, data = __rest(d, ["NewName", "IsEOL", "SeriesName"]);
                const model = await manager.findOne(model_entity_1.Model, {
                    where: { Name: data.Name },
                });
                if (SeriesName) {
                    const model = await this.modelRepo.findOneWithWhereConditions({ Name: NewName }, database_type_enum_1.DataBaseTypeEnum.USE);
                    if ((model === null || model === void 0 ? void 0 : model.SeriesName) && (model === null || model === void 0 ? void 0 : model.SeriesName) !== SeriesName) {
                        await manager.update(series_entity_1.Series, { Name: model === null || model === void 0 ? void 0 : model.SeriesName }, {
                            Use: (0, validators_1.getInUseStatusWithDeletedOrBroken)(model.Use),
                            Live: (0, validators_1.getInLiveStatus)(model.Live),
                        });
                    }
                    let series = await manager.findOne(series_entity_1.Series, {
                        relations: {
                            Models: true,
                            Tag: true,
                        },
                        where: {
                            Name: SeriesName,
                        },
                    });
                    await manager.update(series_entity_1.Series, { Name: SeriesName }, {
                        Use: (0, before_update_status_inuse_1.beforeUpdateStatusInUse)(SeriesName, series.Live, IsEOL),
                        Live: (0, before_update_status_inlive_1.beforeUpdateStatusInLive)(SeriesName, series.Live),
                    });
                }
                else {
                    const modelList = await this.modelRepo.findWithWhereConditions({ SeriesName: model.SeriesName }, database_type_enum_1.DataBaseTypeEnum.USE);
                    const series = await this.seriesRepo.findOneWithWhereConditions({ Name: model.SeriesName }, database_type_enum_1.DataBaseTypeEnum.USE);
                    const isMatch = modelList.filter((model) => model.SeriesName === series.Name)
                        .length === 1;
                    await manager.update(series_entity_1.Series, { Name: series.Name }, {
                        Use: modelList.length === 0 || isMatch
                            ? (0, validators_1.getInUseStatusWithDeletedOrBroken)(series.Use)
                            : (0, validators_1.getInUseStatus)(series.Live, series.Use),
                        Live: (0, validators_1.getInLiveStatus)(series.Live),
                    });
                }
                return manager.update(model_entity_1.Model, { Name: data.Name }, Object.assign(Object.assign({}, data), { SeriesName: SeriesName || null, Name: NewName || data.Name, Use: (0, before_update_status_inuse_1.beforeUpdateStatusInUse)(SeriesName, model.Live, IsEOL), Live: (0, before_update_status_inlive_1.beforeUpdateStatusInLive)(SeriesName, model.Live) }));
            }));
        });
    }
    async remove(names) {
        return await this.dataSource.transaction(async (manager) => {
            const models = await manager.find(model_entity_1.Model, {
                relations: {
                    Series: true,
                    Image: true,
                },
                where: {
                    Name: (0, typeorm_2.In)(names),
                },
            });
            const relatedSeries = models.map((t) => t.SeriesName);
            if (relatedSeries.length > 0) {
                const seriesModelCounter = await manager
                    .createQueryBuilder(model_entity_1.Model, "models")
                    .select("SeriesName")
                    .addSelect("COUNT(*)", "Count")
                    .groupBy("SeriesName")
                    .where("SeriesName IN (:names)", {
                    names: relatedSeries,
                })
                    .getRawMany();
                const brokenSeries = seriesModelCounter
                    .filter((tc) => tc.Count == "1")
                    .map((tc) => tc.SeriesName);
                if (brokenSeries.length > 0) {
                    const seriesList = await this.seriesRepo.findWithWhereConditions({
                        Name: (0, typeorm_2.In)(brokenSeries),
                    }, database_type_enum_1.DataBaseTypeEnum.USE, {
                        Tag: true,
                        Models: true,
                    });
                    for (const series of seriesList) {
                        await manager.update(series_entity_1.Series, {
                            Name: (0, typeorm_2.In)(brokenSeries),
                        }, {
                            Use: (0, validators_1.getInUseStatusWithDeletedOrBroken)(series.Use),
                            Live: (0, validators_1.getInLiveStatus)(series.Live),
                        });
                    }
                }
            }
            const relatedImages = models.map((t) => t.ImageID);
            for (const imageId of relatedImages) {
                const modelList = await this.modelRepo.findWithWhereConditions({ ImageID: imageId }, database_type_enum_1.DataBaseTypeEnum.USE);
                const image = await this.imageRepo.findOneWithWhereConditions({ ImageID: imageId }, database_type_enum_1.DataBaseTypeEnum.USE);
                await manager.update(image_entity_1.Image, {
                    ImageID: imageId,
                }, {
                    Use: modelList.length <= 1
                        ? (0, validators_1.getInUseStatusWithDeletedOrBroken)(image.Use)
                        : (0, validators_1.getInUseStatus)(image.Live, image.Use),
                    Live: (0, validators_1.getInLiveStatus)(image.Live),
                });
            }
            let stampModelInUseToDeleted;
            for (const modelName of names) {
                let series = await manager.findOne(series_entity_1.Series, {
                    relations: {
                        Models: true,
                        Tag: true,
                    },
                    where: {
                        Models: {
                            Name: modelName,
                        },
                    },
                });
                const newStatusIsDeleted = await manager.delete(model_entity_1.Model, {
                    Name: modelName,
                    Use: (0, typeorm_2.In)([DataStateEnum_1.Use.New, DataStateEnum_1.Use.Broken]),
                    Live: DataStateEnum_1.Live.New,
                });
                stampModelInUseToDeleted = await manager.update(model_entity_1.Model, {
                    Name: modelName,
                }, {
                    SeriesName: null,
                    ImageID: null,
                    Use: DataStateEnum_1.Use.Deleted,
                    Live: DataStateEnum_1.Live.Pending,
                });
                if (newStatusIsDeleted.affected === 1) {
                    const matchWithOutStatusDelete = series.Models.filter((model) => model.Use !== DataStateEnum_1.Use.Deleted);
                    await manager.update(series_entity_1.Series, {
                        Name: series.Name,
                    }, {
                        Use: matchWithOutStatusDelete.length <= 1
                            ? (0, validators_1.getInUseStatusWithDeletedOrBroken)(series.Use)
                            : (0, validators_1.getInUseStatus)(series.Live, series.Use),
                        Live: (0, validators_1.getInLiveStatus)(series.Live),
                    });
                    continue;
                }
                else {
                    series = await this.seriesRepo.findOneWithWhereConditions({
                        Name: series.Name,
                    }, database_type_enum_1.DataBaseTypeEnum.USE, {
                        Models: true,
                        Tag: true,
                    });
                    if (series) {
                        const matchWithOutStatusDelete = series.Models.filter((model) => model.Use !== DataStateEnum_1.Use.Deleted);
                        await manager.update(series_entity_1.Series, {
                            Name: series.Name,
                        }, {
                            Use: matchWithOutStatusDelete.length === 0 ||
                                series.Models.length === 1
                                ? (0, validators_1.getInUseStatusWithDeletedOrBroken)(series.Use)
                                : (0, validators_1.getInUseStatus)(series.Live, series.Use),
                            Live: (0, validators_1.getInLiveStatus)(series.Live),
                        });
                    }
                }
            }
            await this.imagesService.updateImageCounter(manager, new Set(relatedImages));
            return stampModelInUseToDeleted;
        });
    }
    async download(res) {
        const data = await this.modelsRepository.find({
            relations: {
                Image: true,
                Series: {
                    Tag: true,
                },
            },
        });
        const workbook = new exceljs_1.Workbook();
        await workbook.xlsx.readFile((0, path_1.resolve)("templates", "exports", "20231109_Download_Model_V0.1.xlsx"));
        const worksheet = workbook.getWorksheet(1);
        const timeCell = worksheet.getCell("F1");
        timeCell.value = new Date();
        const startRow = 5;
        data.forEach((r, i) => {
            var _a, _b, _c, _d;
            worksheet.insertRow(startRow + i, [
                i + 1,
                r.Name,
                r.Use,
                r.Live,
                (_a = r.Series) === null || _a === void 0 ? void 0 : _a.Name,
                (_c = (_b = r.Series) === null || _b === void 0 ? void 0 : _b.Tag) === null || _c === void 0 ? void 0 : _c.Name,
                (_d = r.Image) === null || _d === void 0 ? void 0 : _d.Name,
                r.UpdatedDate,
            ]);
            worksheet.getRow(startRow + i).getCell(8).numFmt = "dd/mmm/yyyy hh:mm:ss";
        });
        return workbook.xlsx.write(res);
    }
    dropdown() {
        return this.modelsRepository.find({
            relations: {
                Series: {
                    Tag: true,
                },
                Image: true,
            },
            where: {
                Use: (0, typeorm_2.Not)(DataStateEnum_1.Use.Deleted),
            },
        });
    }
};
ModelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(model_entity_1.Model, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(series_entity_1.Series, db_1.USE_DB_NAME)),
    __param(2, (0, typeorm_1.InjectDataSource)(db_1.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        images_service_1.ImagesService,
        model_repository_1.ModelRepository,
        images_repository_1.ImagesRepository,
        series_repository_1.SeriesRepository])
], ModelsService);
exports.ModelsService = ModelsService;
//# sourceMappingURL=models.service.js.map