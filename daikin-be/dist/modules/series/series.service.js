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
exports.SeriesService = void 0;
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
const model_entity_1 = require("../models/entities/model.entity");
const model_repository_1 = require("../models/model.repository");
const tag_entity_1 = require("../tags/entities/tag.entity");
const tags_service_1 = require("../tags/tags.service");
const series_entity_1 = require("./entities/series.entity");
const series_repository_1 = require("./series.repository");
let SeriesService = class SeriesService {
    constructor(seriesRepository, dataSource, tagsService, seriesRepo, modelRepo) {
        this.seriesRepository = seriesRepository;
        this.dataSource = dataSource;
        this.tagsService = tagsService;
        this.seriesRepo = seriesRepo;
        this.modelRepo = modelRepo;
    }
    async create(createArraySeriesDto) {
        return await this.dataSource.transaction(async (manager) => {
            const relatedTag = new Set();
            const allCreateSeries = await Promise.all(createArraySeriesDto.map(async (d) => {
                const { SelectedModel } = d, data = __rest(d, ["SelectedModel"]);
                const series = await manager.save(series_entity_1.Series, Object.assign(Object.assign({}, data), { Use: SelectedModel.length > 0 ? DataStateEnum_1.Use.New : DataStateEnum_1.Use.Broken, Live: DataStateEnum_1.Live.New }));
                await manager
                    .createQueryBuilder()
                    .relation(model_entity_1.Model, "Series")
                    .of(SelectedModel)
                    .set(series);
                for (const modelName of SelectedModel) {
                    const model = await this.modelRepo.findOneWithWhereConditions({ Name: modelName }, database_type_enum_1.DataBaseTypeEnum.USE);
                    await manager.update(model_entity_1.Model, {
                        Name: model.Name,
                    }, {
                        Use: (0, validators_1.getInUseStatus)(model.Live, model.Use),
                        Live: (0, validators_1.getInLiveStatus)(model.Live),
                    });
                }
                const isTagExist = await manager.existsBy(tag_entity_1.Tag, {
                    Name: d.Name,
                });
                if (!isTagExist) {
                    await manager.save(tag_entity_1.Tag, {
                        Name: d.Name,
                        IsSeriesType: false,
                        Use: DataStateEnum_1.Use.New,
                        Live: DataStateEnum_1.Live.New,
                    });
                }
                if (data.SeriesType) {
                    relatedTag.add(data.SeriesType);
                }
                return series;
            }));
            await this.tagsService.updateTagCounter(manager, relatedTag);
            return allCreateSeries;
        });
    }
    async findAll(queryPayload) {
        let seriesList = await this.seriesRepo.findAll(queryPayload, database_type_enum_1.DataBaseTypeEnum.USE);
        if (seriesList.meta.totalItems > 0 && seriesList.items.length === 0) {
            queryPayload.page = 1;
            seriesList = await this.seriesRepo.findAll(queryPayload, database_type_enum_1.DataBaseTypeEnum.USE);
        }
        return seriesList;
    }
    findSeriesByName(searchDto) {
        return searchDto.exact
            ? this.seriesRepository.findOne({
                relations: {
                    Tag: true,
                    Models: true,
                },
                where: {
                    Name: searchDto.keyword,
                },
            })
            : this.seriesRepository.find({
                relations: {
                    Tag: true,
                    Models: true,
                },
                where: {
                    Name: (0, typeorm_2.Like)(`%${searchDto.keyword}%`),
                },
            });
    }
    async update(updateArraySeriesDto) {
        return await this.dataSource.transaction(async (manager) => {
            const relatedTag = new Set();
            const allUpdateSeries = await Promise.all(updateArraySeriesDto.map(async (updateSeries) => {
                const { SelectedModel, NewName, IsEOL } = updateSeries, data = __rest(updateSeries, ["SelectedModel", "NewName", "IsEOL"]);
                const modelNameList = SelectedModel;
                const series = await manager.findOne(series_entity_1.Series, {
                    relations: { Models: true, Tag: true },
                    where: { Name: data.Name },
                });
                if (!series) {
                    throw new common_1.NotFoundException("Not Found!");
                }
                if ((series === null || series === void 0 ? void 0 : series.Models.length) > 0) {
                    for (const model of series.Models) {
                        await this.modelRepo.insertOrUpsert(Object.assign(Object.assign({}, model), { SeriesName: null, Use: (0, validators_1.getInUseStatusWithDeletedOrBroken)(model.Use), Live: (0, validators_1.getInLiveStatus)(model.Live) }), database_type_enum_1.DataBaseTypeEnum.USE);
                    }
                }
                const seriesNamePrevList = [];
                for (const modelName of modelNameList) {
                    const series = await manager.findOne(series_entity_1.Series, {
                        relations: { Models: true, Tag: true },
                        where: { Models: { Name: modelName } },
                    });
                    if (series)
                        seriesNamePrevList.push(series.Name);
                    const model = await this.modelRepo.findOneWithWhereConditions({ Name: modelName }, database_type_enum_1.DataBaseTypeEnum.USE);
                    if (!model)
                        continue;
                    await this.modelRepo.insertOrUpsert(Object.assign(Object.assign({}, model), { SeriesName: data.Name, Use: (0, validators_1.getInUseStatus)(model.Live, model.Use), Live: (0, validators_1.getInLiveStatus)(model.Live) }), database_type_enum_1.DataBaseTypeEnum.USE);
                }
                for (const seriesName of seriesNamePrevList) {
                    const series = await this.seriesRepo.findOneWithWhereConditions({ Name: seriesName }, database_type_enum_1.DataBaseTypeEnum.USE, { Models: true, Tag: true });
                    if ((series === null || series === void 0 ? void 0 : series.Models.length) === 0) {
                        await this.seriesRepo.insertOrUpsert(Object.assign(Object.assign({}, series), { Use: (0, validators_1.getInUseStatusWithDeletedOrBroken)(series.Use), Live: (0, validators_1.getInLiveStatus)(series.Live) }), database_type_enum_1.DataBaseTypeEnum.USE);
                    }
                }
                if (series.SeriesType != data.SeriesType) {
                    relatedTag.add(series.SeriesType);
                    relatedTag.add(data.SeriesType);
                }
                const updatedSeries = await manager.update(series_entity_1.Series, {
                    Name: data.Name,
                }, Object.assign(Object.assign({}, data), { Name: NewName || data.Name, Use: (0, before_update_status_inuse_1.beforeUpdateStatusInUse)(modelNameList.length, series.Live, IsEOL), Live: (0, before_update_status_inlive_1.beforeUpdateStatusInLive)(modelNameList.length > 0, series.Live) }));
                return updatedSeries;
            }));
            await this.tagsService.updateTagCounter(manager, relatedTag);
            return allUpdateSeries;
        });
    }
    async remove(names) {
        return await this.dataSource.transaction(async (manager) => {
            const seriesList = await manager.find(series_entity_1.Series, {
                relations: {
                    Tag: true,
                    Models: true,
                },
                where: {
                    Name: (0, typeorm_2.In)(names),
                },
            });
            for (const series of seriesList) {
                for (const model of series.Models) {
                    await manager.update(model_entity_1.Model, {
                        Name: model.Name,
                    }, {
                        Use: (0, validators_1.getInUseStatusWithDeletedOrBroken)(model.Use),
                        Live: (0, validators_1.getInLiveStatus)(model.Live),
                    });
                }
            }
            for (const name of names) {
                const modelList = await this.modelRepo.findWithWhereConditions({ SeriesName: name }, database_type_enum_1.DataBaseTypeEnum.USE, {
                    Image: true,
                    Series: true,
                });
                for (const model of modelList) {
                    if (model.Use === DataStateEnum_1.Use.Deleted)
                        continue;
                    await manager.update(model_entity_1.Model, {
                        Name: model.Name,
                    }, {
                        SeriesName: null,
                    });
                }
            }
            await manager.delete(series_entity_1.Series, {
                Name: (0, typeorm_2.In)(names),
                Use: (0, typeorm_2.In)([DataStateEnum_1.Use.New, DataStateEnum_1.Use.Broken]),
                Live: (0, typeorm_2.In)([DataStateEnum_1.Live.New]),
            });
            const allDeleteSeries = await manager.update(series_entity_1.Series, {
                Name: (0, typeorm_2.In)(names),
                Live: (0, typeorm_2.In)([DataStateEnum_1.Live.Live, DataStateEnum_1.Live.Pending]),
            }, {
                Use: DataStateEnum_1.Use.Deleted,
                Live: DataStateEnum_1.Live.Pending,
            });
            const relatedTag = new Set();
            seriesList.forEach((s) => {
                if (s.SeriesType) {
                    relatedTag.add(s.SeriesType);
                }
            });
            await this.tagsService.updateTagCounter(manager, relatedTag);
            return allDeleteSeries;
        });
    }
    async download(res) {
        const data = await this.seriesRepository.find({});
        const workbook = new exceljs_1.Workbook();
        await workbook.xlsx.readFile((0, path_1.resolve)("templates", "exports", "20231109_Download_Series_V0.1.xlsx"));
        const worksheet = workbook.getWorksheet(1);
        const timeCell = worksheet.getCell("F1");
        timeCell.value = new Date();
        const startRow = 5;
        data.forEach((r, i) => {
            worksheet.insertRow(startRow + i, [
                i + 1,
                r.Name,
                r.SeriesType,
                r.Use,
                r.Live,
                r.UpdatedDate,
            ]);
            worksheet.getRow(startRow + i).getCell(6).numFmt = "dd/mmm/yyyy hh:mm:ss";
        });
        return workbook.xlsx.write(res);
    }
    async exportModelLinkEditSeries(res, exportModelLinkSeriesDto) {
        var _a;
        const seriesData = await this.seriesRepository.findOne({
            relations: {
                Models: true,
            },
            where: { Name: exportModelLinkSeriesDto.SelectedSeries },
        });
        const workbook = new exceljs_1.Workbook();
        await workbook.xlsx.readFile((0, path_1.resolve)("templates", "SeriesMdlMgmt_EditSeries_ModelList_v0.5-TBC.xlsx"));
        const worksheet = workbook.getWorksheet(1);
        const startRow = 7;
        (_a = seriesData.Models) === null || _a === void 0 ? void 0 : _a.forEach((m, i) => {
            worksheet.getRow(2).getCell(3).value = m.SeriesName;
            if (startRow + i >= 7 && startRow + i <= 13) {
                worksheet.getRow(startRow + i).getCell(1).value = i + 1;
                worksheet.getRow(startRow + i).getCell(2).value = m.Name;
            }
            else {
                worksheet.insertRow(startRow + i, [i + 1, m.Name]);
            }
        });
        return workbook.xlsx.write(res);
    }
    async dropdown() {
        return await this.seriesRepository.find({
            relations: {
                Models: true,
                Tag: true,
            },
            where: {
                Use: (0, typeorm_2.Not)(DataStateEnum_1.Use.Deleted),
            },
        });
    }
};
SeriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(series_entity_1.Series, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectDataSource)(db_1.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        tags_service_1.TagsService,
        series_repository_1.SeriesRepository,
        model_repository_1.ModelRepository])
], SeriesService);
exports.SeriesService = SeriesService;
//# sourceMappingURL=series.service.js.map