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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var DataManagementsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManagementsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exceljs_1 = __importDefault(require("exceljs"));
const typeorm_2 = require("typeorm");
const db_1 = require("../../shared/constants/db");
const enum_1 = require("../../shared/enum");
const database_type_enum_1 = require("../../shared/enum/database-type.enum");
const DataStateEnum_1 = require("../../shared/enum/DataStateEnum");
const category_entity_1 = require("../categories/entities/category.entity");
const company_entity_1 = require("../companies/entities/company.entity");
const image_entity_1 = require("../images/entities/image.entity");
const model_entity_1 = require("../models/entities/model.entity");
const section_entity_1 = require("../sections/entities/section.entity");
const sections_repository_1 = require("../sections/sections.repository");
const series_entity_1 = require("../series/entities/series.entity");
const slidefile_entity_1 = require("../slidefiles/entities/slidefile.entity");
const slidefiles_archive_entity_1 = require("../slidefiles/entities/slidefiles_archive.entity");
const slide_entity_1 = require("../slides/entities/slide.entity");
const slidetag_entity_1 = require("../slidetags/entities/slidetag.entity");
const tag_entity_1 = require("../tags/entities/tag.entity");
const DataStateEnum_2 = require("./../../shared/enum/DataStateEnum");
let DataManagementsService = DataManagementsService_1 = class DataManagementsService {
    constructor(useCompanyRepository, useSeriesRepository, useModelsRepository, useCategorysRepository, useSectionsRepository, useSlidesRepository, useSlideFilesRepository, useSlideFilesArchiveRepository, useSlideTagRepository, useTagsRepository, useImagesRepository, liveDataSource, useDataSource, sectionRepo) {
        this.useCompanyRepository = useCompanyRepository;
        this.useSeriesRepository = useSeriesRepository;
        this.useModelsRepository = useModelsRepository;
        this.useCategorysRepository = useCategorysRepository;
        this.useSectionsRepository = useSectionsRepository;
        this.useSlidesRepository = useSlidesRepository;
        this.useSlideFilesRepository = useSlideFilesRepository;
        this.useSlideFilesArchiveRepository = useSlideFilesArchiveRepository;
        this.useSlideTagRepository = useSlideTagRepository;
        this.useTagsRepository = useTagsRepository;
        this.useImagesRepository = useImagesRepository;
        this.liveDataSource = liveDataSource;
        this.useDataSource = useDataSource;
        this.sectionRepo = sectionRepo;
        this.logger = new common_1.Logger(DataManagementsService_1.name);
    }
    async listRelease(queryPayload) {
        return await this.getAllUseState(queryPayload);
    }
    async doRelease(user, queryPayload) {
        const { series, models, categories, sections, slides, tags, images, companies, } = await this.getAllUseState(queryPayload);
        const featuresModel = async (manager) => {
            this.logger.log(queryPayload.companyCode);
            const isCompanyTypeLocalAdmin = queryPayload.companyCode !== enum_1.CompanyCodeEnum.GLOBAL;
            const searchCompany = isCompanyTypeLocalAdmin
                ? {
                    CompanyCode: queryPayload.companyCode,
                }
                : null;
            const statusSectionWithDeleted = await this.sectionRepo.findWithWhereConditions({
                Use: DataStateEnum_2.Use.Deleted,
                CompanyCode: !queryPayload.companyCode ||
                    queryPayload.companyCode === enum_1.CompanyCodeEnum.GLOBAL
                    ? null
                    : queryPayload.companyCode,
            }, database_type_enum_1.DataBaseTypeEnum.USE);
            const statusIdsWithDeleted = statusSectionWithDeleted.map((section) => section.SectionID);
            await Promise.all([
                tags.map(async (t) => {
                    return (await manager.delete(tag_entity_1.Tag, {
                        TagID: t.TagID,
                        Use: DataStateEnum_2.Use.Deleted,
                    }));
                }),
                await this.sectionRepo.deleteByIds(statusIdsWithDeleted, database_type_enum_1.DataBaseTypeEnum.USE),
                await this.sectionRepo.deleteByIds(statusIdsWithDeleted, database_type_enum_1.DataBaseTypeEnum.LIVE),
                categories.map(async (c) => {
                    const isDeleted = c.Use === DataStateEnum_2.Use.Deleted;
                    return (await manager.update(section_entity_1.Section, {
                        CategoryID: c.CategoryID,
                    }, {
                        CategoryID: isDeleted ? null : c.CategoryID,
                    }),
                        await manager.delete(category_entity_1.Category, Object.assign(Object.assign({}, searchCompany), { CategoryID: c.CategoryID, Use: DataStateEnum_2.Use.Deleted })));
                }),
                models.map(async (m) => await manager.delete(model_entity_1.Model, {
                    Name: m.Name,
                    Use: DataStateEnum_2.Use.Deleted,
                })),
                series.map(async (s) => {
                    const isDeleted = s.Use === DataStateEnum_2.Use.Deleted;
                    return (await manager.update(model_entity_1.Model, { SeriesName: s.Name }, { SeriesName: isDeleted ? null : s.Name }),
                        await manager.delete(series_entity_1.Series, {
                            Name: s.Name,
                            Use: DataStateEnum_2.Use.Deleted,
                        }));
                }),
                slides.map(async (s) => {
                    const deletedSlidesWithDeleteStatus = await manager.delete(slide_entity_1.Slide, Object.assign(Object.assign({}, searchCompany), { SlideID: s.SlideID, Use: DataStateEnum_2.Use.Deleted }));
                    if (deletedSlidesWithDeleteStatus) {
                        await manager.delete(slidefile_entity_1.SlideFile, {
                            SlideID: s.SlideID,
                        });
                        await manager.delete(slidefiles_archive_entity_1.SlideFileArchive, {
                            SlideID: s.SlideID,
                        });
                    }
                    return deletedSlidesWithDeleteStatus;
                }),
                images.map(async (im) => {
                    const isDeleted = im.Use === DataStateEnum_2.Use.Deleted;
                    return (await manager.update(model_entity_1.Model, { ImageID: im.ImageID }, { ImageID: isDeleted ? null : im.ImageID }),
                        await manager.delete(image_entity_1.Image, {
                            ImageID: im.ImageID,
                            Use: DataStateEnum_2.Use.Deleted,
                        }));
                }),
            ]);
            await manager.upsert(tag_entity_1.Tag, tags
                .filter((t) => t.Use != DataStateEnum_2.Use.Deleted)
                .map((t) => {
                return Object.assign(Object.assign({}, t), { Use: DataStateEnum_2.Use.Using, Live: t.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live });
            }), ["TagID"]);
            await manager.upsert(category_entity_1.Category, categories
                .filter((c) => c.Use != DataStateEnum_2.Use.Deleted)
                .map((c) => {
                return Object.assign(Object.assign({}, c), { Use: c.Sections.length > 0 ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken, Live: c.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live });
            }), ["CategoryID"]);
            await manager.upsert(section_entity_1.Section, sections
                .filter((s) => s.Use != DataStateEnum_2.Use.Deleted)
                .map((s) => {
                const inLive = s.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live;
                return Object.assign(Object.assign({}, s), { Category: Object.assign(Object.assign({}, s.Category), { Use: s.Category ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken, Live: inLive }), Tags: s.Tags.length > 0
                        ? s.Tags.map((t) => (Object.assign(Object.assign({}, t), { Use: DataStateEnum_2.Use.Using })))
                        : [], Use: s.Category || s.Tags.length > 0 ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken, Live: inLive });
            }), ["SectionID"]);
            await manager.upsert(image_entity_1.Image, images
                .filter((i) => i.Use != DataStateEnum_2.Use.Deleted)
                .map((i) => {
                return Object.assign(Object.assign({}, i), { Use: i.Models.length > 0 ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken, Live: i.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live });
            }), ["ImageID"]);
            const promiseModels = [];
            await manager.upsert(series_entity_1.Series, series
                .filter((s) => s.Use != DataStateEnum_2.Use.Deleted)
                .map((s) => {
                for (let index = 0; index < s.Models.length; index++) {
                    const keyModel = s.Models[index];
                    promiseModels.push(manager.update(model_entity_1.Model, { Name: keyModel.Name }, {
                        Use: keyModel.Name ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken,
                        Live: s.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live,
                    }));
                }
                return Object.assign(Object.assign({}, s), { Use: DataStateEnum_2.Use.Using, Live: s.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live });
            }), ["Name"]);
            await Promise.all(promiseModels);
            await manager.upsert(model_entity_1.Model, models
                .filter((m) => m.Use != DataStateEnum_2.Use.Deleted)
                .map((m) => {
                return Object.assign(Object.assign({}, m), { Use: m.SeriesName ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken, Live: m.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live });
            }), ["Name"]);
            await manager.upsert(slide_entity_1.Slide, slides
                .filter((s) => s.Use != DataStateEnum_2.Use.Deleted)
                .map((s) => {
                var _a;
                return Object.assign(Object.assign({}, s), { Use: s.Tags.length > 0 ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken, SectionID: (_a = s.Section) === null || _a === void 0 ? void 0 : _a.SectionID, Live: s.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live });
            }), ["SlideID"]);
            const matchSlides = slides
                .filter((s) => s.Use != DataStateEnum_2.Use.Deleted)
                .map((s) => s.SlideID);
            const matchSlideFiles = await this.useSlideFilesRepository.findBy({
                SlideID: (0, typeorm_2.In)(matchSlides),
            });
            await manager.upsert(slidefile_entity_1.SlideFile, matchSlideFiles, ["SlideID"]);
            const matchSlideFilesArchive = await this.useSlideFilesArchiveRepository.findBy({
                SlideID: (0, typeorm_2.In)(matchSlides),
            });
            await manager.upsert(slidefiles_archive_entity_1.SlideFileArchive, matchSlideFilesArchive, [
                "SlideID",
            ]);
            const matchSlideTags = slides
                .filter((s) => s.Use !== DataStateEnum_2.Use.Deleted)
                .map((s) => s.SlideID);
            const matchSlideTag = await this.useSlideTagRepository.findBy({
                SlideID: (0, typeorm_2.In)(matchSlideTags),
            });
            this.logger.log(matchSlideTag);
            await this.liveDataSource.transaction(async (manager) => {
                for (const slideTag of matchSlideTag) {
                    await manager.delete(slidetag_entity_1.SlideTag, {
                        SlideID: slideTag.SlideID,
                    });
                }
            });
            await manager.upsert(slidetag_entity_1.SlideTag, matchSlideTag, ["SlideID"]);
        };
        await this.useDataSource.transaction(async (manager) => await featuresModel(manager));
        return await this.liveDataSource.transaction(async (manager) => {
            await manager.upsert(company_entity_1.Company, companies, ["CompanyCode"]);
            await featuresModel(manager);
        });
    }
    async doScheduleRelease(user, queryPayload) {
        this.logger.log(queryPayload.companyCode);
        const { series, models, categories, sections, slides, tags, images, companies, } = await this.getAllUseState(queryPayload);
        const featuresModel = async (manager) => {
            this.logger.log(queryPayload.companyCode);
            const isCompanyTypeLocalAdmin = queryPayload.companyCode !== enum_1.CompanyCodeEnum.GLOBAL;
            const searchCompany = isCompanyTypeLocalAdmin
                ? {
                    CompanyCode: queryPayload.companyCode,
                }
                : null;
            await Promise.all([
                tags.map(async (t) => {
                    return (await manager.delete(tag_entity_1.Tag, {
                        TagID: t.TagID,
                        Use: DataStateEnum_2.Use.Deleted,
                    }));
                }),
                sections.map(async (s) => {
                    const isDeleted = s.Use === DataStateEnum_2.Use.Deleted;
                    const removeSectionWork = await manager.findBy(section_entity_1.Section, {
                        SectionID: s.SectionID,
                        Use: (0, typeorm_2.In)([DataStateEnum_2.Use.New, DataStateEnum_2.Use.Broken]),
                        Live: (0, typeorm_2.In)([DataStateEnum_1.Live.New]),
                    });
                    return (await manager.update(section_entity_1.Section, { SectionID: s.SectionID }, { CategoryID: isDeleted ? null : s.CategoryID }),
                        await manager.update(slide_entity_1.Slide, { SectionID: s.SectionID }, { SectionID: isDeleted ? null : s.CategoryID }));
                }),
                categories.map(async (c) => {
                    const isDeleted = c.Use === DataStateEnum_2.Use.Deleted;
                    return (await manager.update(section_entity_1.Section, {
                        CategoryID: c.CategoryID,
                    }, {
                        CategoryID: isDeleted ? null : c.CategoryID,
                    }),
                        await manager.delete(category_entity_1.Category, Object.assign(Object.assign({}, searchCompany), { CategoryID: c.CategoryID, Use: DataStateEnum_2.Use.Deleted })));
                }),
                models.map(async (m) => await manager.delete(model_entity_1.Model, Object.assign(Object.assign({}, searchCompany), { Name: m.Name, Use: DataStateEnum_2.Use.Deleted }))),
                series.map(async (s) => {
                    const isDeleted = s.Use === DataStateEnum_2.Use.Deleted;
                    return (await manager.update(model_entity_1.Model, { SeriesName: s.Name }, { SeriesName: isDeleted ? null : s.Name }),
                        await manager.delete(series_entity_1.Series, Object.assign(Object.assign({}, searchCompany), { Name: s.Name, Use: DataStateEnum_2.Use.Deleted })));
                }),
                slides.map(async (s) => {
                    return await manager.delete(slide_entity_1.Slide, Object.assign(Object.assign({}, searchCompany), { SlideID: s.SlideID, Use: DataStateEnum_2.Use.Deleted }));
                }),
                images.map(async (im) => {
                    const isDeleted = im.Use === DataStateEnum_2.Use.Deleted;
                    return (await manager.update(model_entity_1.Model, { ImageID: im.ImageID }, { ImageID: isDeleted ? null : im.ImageID }),
                        await manager.delete(image_entity_1.Image, {
                            ImageID: im.ImageID,
                            Use: DataStateEnum_2.Use.Deleted,
                        }));
                }),
            ]);
            await manager.upsert(tag_entity_1.Tag, tags
                .filter((t) => t.Use != DataStateEnum_2.Use.Deleted)
                .map((t) => {
                return Object.assign(Object.assign({}, t), { Use: DataStateEnum_2.Use.Using, Live: t.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live });
            }), ["TagID"]);
            await manager.upsert(category_entity_1.Category, categories
                .filter((c) => c.Use != DataStateEnum_2.Use.Deleted)
                .map((c) => {
                return Object.assign(Object.assign({}, c), { Use: c.Sections.length > 0 ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken, Live: c.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live });
            }), ["CategoryID"]);
            await manager.upsert(section_entity_1.Section, sections
                .filter((s) => s.Use != DataStateEnum_2.Use.Deleted)
                .map((s) => {
                const inLive = s.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live;
                return Object.assign(Object.assign({}, s), { Category: Object.assign(Object.assign({}, s.Category), { Use: s.Category ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken, Live: inLive }), Tags: s.Tags.length > 0
                        ? s.Tags.map((t) => (Object.assign(Object.assign({}, t), { Use: DataStateEnum_2.Use.Using })))
                        : [], Use: s.Category || s.Tags.length > 0 ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken, Live: inLive });
            }), ["SectionID"]);
            await manager.upsert(image_entity_1.Image, images
                .filter((i) => i.Use != DataStateEnum_2.Use.Deleted)
                .map((i) => {
                return Object.assign(Object.assign({}, i), { Use: i.Models.length > 0 ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken, Live: i.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live });
            }), ["ImageID"]);
            const promiseModels = [];
            await manager.upsert(series_entity_1.Series, series
                .filter((s) => s.Use != DataStateEnum_2.Use.Deleted)
                .map((s) => {
                for (let index = 0; index < s.Models.length; index++) {
                    const keyModel = s.Models[index];
                    promiseModels.push(manager.update(model_entity_1.Model, { Name: keyModel.Name }, {
                        Use: keyModel.Name ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken,
                        Live: s.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live,
                    }));
                }
                return Object.assign(Object.assign({}, s), { Use: DataStateEnum_2.Use.Using, Live: s.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live });
            }), ["Name"]);
            await Promise.all(promiseModels);
            await manager.upsert(model_entity_1.Model, models
                .filter((m) => m.Use != DataStateEnum_2.Use.Deleted)
                .map((m) => {
                return Object.assign(Object.assign({}, m), { Use: m.SeriesName ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken, Live: m.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live });
            }), ["Name"]);
            await manager.upsert(slide_entity_1.Slide, slides
                .filter((s) => s.Use != DataStateEnum_2.Use.Deleted)
                .map((s) => {
                var _a;
                return Object.assign(Object.assign({}, s), { Use: s.Tags.length > 0 ? DataStateEnum_2.Use.Using : DataStateEnum_2.Use.Broken, SectionID: (_a = s.Section) === null || _a === void 0 ? void 0 : _a.SectionID, Live: s.Use == DataStateEnum_2.Use.EOL ? DataStateEnum_1.Live.EOL : DataStateEnum_1.Live.Live });
            }), ["SlideID"]);
            const matchSlides = slides
                .filter((s) => s.Use != DataStateEnum_2.Use.Deleted)
                .map((s) => s.SlideID);
            const matchSlideFiles = await this.useSlideFilesRepository.findBy({
                SlideID: (0, typeorm_2.In)(matchSlides),
            });
            await manager.upsert(slidefile_entity_1.SlideFile, matchSlideFiles, ["SlideID"]);
            const matchSlideTags = slides
                .filter((s) => s.Use !== DataStateEnum_2.Use.Deleted)
                .map((s) => s.SlideID);
            const matchSlidetag = await this.useSlideTagRepository.findBy({
                SlideID: (0, typeorm_2.In)(matchSlideTags),
            });
            this.logger.log(matchSlidetag);
            await this.liveDataSource.transaction(async (manager) => {
                for (const slideTag of matchSlidetag) {
                    await manager.delete(slidetag_entity_1.SlideTag, {
                        SlideID: slideTag.SlideID,
                    });
                }
            });
            await manager.upsert(slidetag_entity_1.SlideTag, matchSlidetag, ["SlideID"]);
        };
        await this.useDataSource.transaction(async (manager) => await featuresModel(manager));
        return await this.liveDataSource.transaction(async (manager) => {
            await manager.upsert(company_entity_1.Company, companies, ["CompanyCode"]);
            await featuresModel(manager);
        });
    }
    async getAllUseState(queryPayload) {
        let companyCode = null;
        if (queryPayload.companyCode !== enum_1.CompanyCodeEnum.GLOBAL) {
            companyCode = queryPayload.companyCode;
        }
        let whereQueryWithOutCompanyCode = {};
        whereQueryWithOutCompanyCode = {
            Live: (0, typeorm_2.In)([DataStateEnum_1.Live.Pending, DataStateEnum_1.Live.New]),
            Use: (0, typeorm_2.In)([DataStateEnum_2.Use.New, DataStateEnum_2.Use.Using, DataStateEnum_2.Use.EOL, DataStateEnum_2.Use.Deleted]),
        };
        let whereQuery = {
            Live: (0, typeorm_2.In)([DataStateEnum_1.Live.Pending, DataStateEnum_1.Live.New]),
            Use: (0, typeorm_2.In)([DataStateEnum_2.Use.New, DataStateEnum_2.Use.Using, DataStateEnum_2.Use.EOL, DataStateEnum_2.Use.Deleted]),
            CompanyCode: companyCode === null ? (0, typeorm_2.IsNull)() : companyCode,
        };
        if (queryPayload.live === false) {
            const tags = await this.liveDataSource
                .getRepository(tag_entity_1.Tag)
                .find({ where: whereQueryWithOutCompanyCode });
            const categories = await this.liveDataSource
                .getRepository(category_entity_1.Category)
                .find({ where: whereQuery });
            const sections = await this.liveDataSource
                .getRepository(section_entity_1.Section)
                .find({ where: whereQuery });
            const images = await this.liveDataSource
                .getRepository(image_entity_1.Image)
                .find({ where: whereQueryWithOutCompanyCode });
            const series = await this.liveDataSource
                .getRepository(series_entity_1.Series)
                .find({ where: whereQueryWithOutCompanyCode });
            const models = await this.liveDataSource
                .getRepository(model_entity_1.Model)
                .find({ where: whereQueryWithOutCompanyCode });
            const slides = await this.liveDataSource
                .getRepository(slide_entity_1.Slide)
                .find({ where: whereQuery });
            return {
                series,
                models,
                categories,
                sections,
                slides,
                tags,
                images,
            };
        }
        else {
            this.logger.log(companyCode);
            const series = await this.useSeriesRepository.find({
                relations: {
                    Models: true,
                    Tag: true,
                },
                where: [
                    Object.assign({}, whereQueryWithOutCompanyCode),
                    {
                        Models: whereQueryWithOutCompanyCode,
                        Tag: whereQueryWithOutCompanyCode,
                    },
                ],
            });
            const models = await this.useModelsRepository.find({
                relations: { Series: true },
                where: [
                    Object.assign({}, whereQueryWithOutCompanyCode),
                    { Series: whereQueryWithOutCompanyCode },
                ],
            });
            const categories = await this.useCategorysRepository.find({
                relations: { Sections: true },
                where: [
                    Object.assign({}, whereQuery),
                    { Sections: whereQuery },
                ],
            });
            const sections = await this.useSectionsRepository.find({
                relations: {
                    Category: true,
                    Tags: true,
                },
                where: [
                    Object.assign({}, whereQuery),
                    { Category: whereQuery, Tags: whereQueryWithOutCompanyCode },
                ],
            });
            let slides = await this.useSlidesRepository.find({
                relations: { Section: true, Tags: true },
                where: [
                    Object.assign({}, whereQuery),
                    { Section: whereQuery, Tags: whereQueryWithOutCompanyCode },
                ],
            });
            slides = slides.filter((slide) => {
                if (slide.Section.Use === DataStateEnum_2.Use.Broken &&
                    slide.Section.Live === DataStateEnum_1.Live.New) {
                    return false;
                }
                return true;
            });
            const tags = await this.useTagsRepository.find({
                relations: { Sections: true, Slides: true },
                where: [
                    Object.assign({}, whereQueryWithOutCompanyCode),
                    { Sections: whereQuery, Slides: whereQuery },
                ],
            });
            const images = await this.useImagesRepository.find({
                relations: { Models: true },
                where: [
                    Object.assign({}, whereQueryWithOutCompanyCode),
                    { Models: whereQueryWithOutCompanyCode },
                ],
            });
            const companies = await this.useCompanyRepository.find();
            return {
                series,
                models,
                categories,
                sections,
                slides,
                tags,
                images,
                companies,
            };
        }
    }
    async exportExcelList(res, queryPayload) {
        let modulesDataManagement = [];
        const getAllUseStateBody = Object.assign({}, queryPayload);
        console.log(getAllUseStateBody);
        const modules = await this.getAllUseState(getAllUseStateBody);
        const keysModule = [
            "tags",
            "categories",
            "models",
            "series",
            "slides",
            "sections",
            "images",
        ];
        keysModule.forEach((key) => {
            modulesDataManagement.push(...modules[key].map((module) => {
                return {
                    name: key === "slides" ? module.DisplayName : module.Name,
                    type: key,
                };
            }));
        });
        const workbook = new exceljs_1.default.Workbook();
        const sheet = workbook.addWorksheet("sheet1");
        sheet.columns = [
            { key: "name", header: "Name", width: 20 },
            { key: "type", header: "Type", width: 20 },
        ];
        sheet.addRows(modulesDataManagement);
        return workbook.xlsx.write(res);
    }
};
DataManagementsService = DataManagementsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(series_entity_1.Series, db_1.USE_DB_NAME)),
    __param(2, (0, typeorm_1.InjectRepository)(model_entity_1.Model, db_1.USE_DB_NAME)),
    __param(3, (0, typeorm_1.InjectRepository)(category_entity_1.Category, db_1.USE_DB_NAME)),
    __param(4, (0, typeorm_1.InjectRepository)(section_entity_1.Section, db_1.USE_DB_NAME)),
    __param(5, (0, typeorm_1.InjectRepository)(slide_entity_1.Slide, db_1.USE_DB_NAME)),
    __param(6, (0, typeorm_1.InjectRepository)(slidefile_entity_1.SlideFile, db_1.USE_DB_NAME)),
    __param(7, (0, typeorm_1.InjectRepository)(slidefiles_archive_entity_1.SlideFileArchive, db_1.USE_DB_NAME)),
    __param(8, (0, typeorm_1.InjectRepository)(slidetag_entity_1.SlideTag, db_1.USE_DB_NAME)),
    __param(9, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag, db_1.USE_DB_NAME)),
    __param(10, (0, typeorm_1.InjectRepository)(image_entity_1.Image, db_1.USE_DB_NAME)),
    __param(11, (0, typeorm_1.InjectDataSource)(db_1.LIVE_DB_NAME)),
    __param(12, (0, typeorm_1.InjectDataSource)(db_1.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        typeorm_2.DataSource,
        sections_repository_1.SectionsRepository])
], DataManagementsService);
exports.DataManagementsService = DataManagementsService;
//# sourceMappingURL=datamanagements.service.js.map