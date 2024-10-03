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
var TagsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exceljs_1 = require("exceljs");
const path_1 = require("path");
const typeorm_2 = require("typeorm");
const db_1 = require("../../shared/constants/db");
const database_type_enum_1 = require("../../shared/enum/database-type.enum");
const DataStateEnum_1 = require("../../shared/enum/DataStateEnum");
const before_update_status_inlive_1 = require("../../utils/before-update-status-inlive");
const validators_1 = require("../../utils/validators");
const section_entity_1 = require("../sections/entities/section.entity");
const sectiontag_entity_1 = require("../sectiontags/entities/sectiontag.entity");
const slide_entity_1 = require("../slides/entities/slide.entity");
const slidetag_entity_1 = require("../slidetags/entities/slidetag.entity");
const series_entity_1 = require("./../series/entities/series.entity");
const tag_entity_1 = require("./entities/tag.entity");
const tags_repository_1 = require("./tags.repository");
let TagsService = TagsService_1 = class TagsService {
    constructor(tagsRepository, dataSource, tagRepo) {
        this.tagsRepository = tagsRepository;
        this.dataSource = dataSource;
        this.tagRepo = tagRepo;
        this.logger = new common_1.Logger(TagsService_1.name);
    }
    async create(createArrayTagDto) {
        return await this.dataSource.transaction(async (manager) => await manager.insert(tag_entity_1.Tag, createArrayTagDto.map((c) => (Object.assign(Object.assign({}, c), { Use: DataStateEnum_1.Use.New, Live: DataStateEnum_1.Live.New })))));
    }
    async findAll(queryPayload) {
        let tagList = await this.tagRepo.findAll(queryPayload, database_type_enum_1.DataBaseTypeEnum.USE);
        if (tagList.meta.totalItems > 0 && tagList.items.length === 0) {
            queryPayload.page = 1;
            tagList = await this.tagRepo.findAll(queryPayload, database_type_enum_1.DataBaseTypeEnum.USE);
        }
        return tagList;
    }
    findById(id) {
        return this.tagsRepository.findOne({
            relations: {
                Slides: true,
                Sections: true,
            },
            where: {
                TagID: id,
            },
        });
    }
    findTagByName(searchDto) {
        return searchDto.exact
            ? this.tagsRepository.findOne({
                relations: {
                    Slides: true,
                    Sections: true,
                },
                where: {
                    Name: searchDto.keyword,
                },
            })
            : this.tagsRepository.find({
                relations: {
                    Slides: true,
                    Sections: true,
                },
                where: {
                    Name: (0, typeorm_2.Like)(`%${searchDto.keyword}%`),
                },
            });
    }
    async update(updateArrayTagDto) {
        return await this.dataSource.transaction(async (manager) => await Promise.all(updateArrayTagDto.map(async (d) => {
            const { SelectedSection } = d, data = __rest(d, ["SelectedSection"]);
            const tag = await manager.findOne(tag_entity_1.Tag, {
                relations: { Sections: true, Slides: true },
                where: { TagID: data.TagID },
            });
            await manager
                .createQueryBuilder()
                .relation(tag_entity_1.Tag, "Sections")
                .of(tag.TagID)
                .addAndRemove(SelectedSection, tag.Sections);
            for (const section of tag.Sections) {
                await manager.update(section_entity_1.Section, {
                    SectionID: section.SectionID,
                }, {
                    Use: (0, validators_1.getInUseStatus)(section.Live, section.Use),
                    Live: (0, validators_1.getInLiveStatus)(section.Live),
                });
            }
            for (const slide of tag.Slides) {
                await manager.update(slide_entity_1.Slide, {
                    SlideID: slide.SlideID,
                }, {
                    Use: (0, validators_1.getInUseStatus)(slide.Live, slide.Use),
                    Live: (0, validators_1.getInLiveStatus)(slide.Live),
                });
            }
            for (const payload of updateArrayTagDto) {
                const seriesList = await manager.find(series_entity_1.Series, {
                    where: { SeriesType: payload.TagID },
                });
                for (const series of seriesList) {
                    await manager.update(series_entity_1.Series, {
                        Name: series.Name,
                    }, {
                        Use: (0, validators_1.getInUseStatus)(series.Live, series.Use),
                        Live: (0, validators_1.getInLiveStatus)(series.Live),
                    });
                }
            }
            return await manager.update(tag_entity_1.Tag, {
                TagID: data.TagID,
            }, Object.assign(Object.assign({}, data), { Use: (0, validators_1.getInUseStatus)(tag.Live, tag.Use), Live: (0, before_update_status_inlive_1.beforeUpdateStatusInLive)(SelectedSection.length > 0, tag.Live) }));
        })));
    }
    async remove(ids) {
        return await this.dataSource.transaction(async (manager) => {
            const tags = await manager.find(tag_entity_1.Tag, {
                relations: {
                    Slides: true,
                    Sections: true,
                },
                where: {
                    TagID: (0, typeorm_2.In)(ids),
                },
            });
            const relatedSlides = tags.flatMap((t) => t.Slides.map((s) => s.SlideID));
            if (relatedSlides.length > 0) {
                const slideTagCounter = await manager
                    .createQueryBuilder(slidetag_entity_1.SlideTag, "slidetags")
                    .select("SlideID")
                    .addSelect("COUNT(*)", "Count")
                    .groupBy("SlideID")
                    .where("SlideID IN (:names)", {
                    names: relatedSlides,
                })
                    .getRawMany();
                const filterCountSlideTagWithOutZero = slideTagCounter
                    .filter((tc) => tc.Count > "0")
                    .map((tc) => tc.SlideID);
                if (filterCountSlideTagWithOutZero.length > 0) {
                    for (const slideId of filterCountSlideTagWithOutZero) {
                        const slide = await manager.findOne(slide_entity_1.Slide, {
                            where: {
                                SlideID: slideId,
                            },
                        });
                        const deletedSlideTag = await manager.delete(slidetag_entity_1.SlideTag, {
                            TagID: (0, typeorm_2.In)(ids),
                        });
                        const slideTag = await manager.find(slidetag_entity_1.SlideTag, {
                            where: {
                                SlideID: slideId,
                            },
                        });
                        if (deletedSlideTag.affected > 0) {
                            await manager.update(slide_entity_1.Slide, {
                                SlideID: slide.SlideID,
                            }, {
                                Use: slideTag.length === 0
                                    ? (0, validators_1.getInUseStatusWithDeletedOrBroken)(slide.Use)
                                    : (0, validators_1.getInUseStatus)(slide.Live, slide.Use),
                                Live: (0, validators_1.getInLiveStatus)(slide.Live),
                            });
                        }
                    }
                }
            }
            const relatedSections = tags.flatMap((t) => t.Sections.map((s) => s.SectionID));
            if (relatedSections.length > 0) {
                const sectionTagCounter = await manager
                    .createQueryBuilder(sectiontag_entity_1.SectionTag, "sectiontags")
                    .select("SectionID")
                    .addSelect("COUNT(*)", "Count")
                    .groupBy("SectionID")
                    .where("SectionID IN (:sections)", {
                    sections: relatedSections,
                })
                    .getRawMany();
                const filterCountSectionTagWithOutZero = sectionTagCounter
                    .filter((tc) => tc.Count > "0")
                    .map((tc) => tc.SectionID);
                if (filterCountSectionTagWithOutZero.length > 0) {
                    for (const sectionId of filterCountSectionTagWithOutZero) {
                        const section = await manager.findOne(section_entity_1.Section, {
                            where: {
                                SectionID: sectionId,
                            },
                        });
                        const deletedSectionTag = await manager.delete(sectiontag_entity_1.SectionTag, {
                            TagID: (0, typeorm_2.In)(ids),
                        });
                        if (deletedSectionTag.affected > 0) {
                            await manager.update(section_entity_1.Section, {
                                SectionID: section.SectionID,
                            }, {
                                Live: (0, validators_1.getInLiveStatus)(section.Live),
                            });
                        }
                    }
                }
            }
            const tagIds = tags.map((t) => t.TagID);
            for (const tagId of tagIds) {
                const seriesList = await manager.find(series_entity_1.Series, {
                    where: {
                        SeriesType: tagId,
                    },
                });
                for (const series of seriesList) {
                    await manager.update(series_entity_1.Series, {
                        SeriesType: tagId,
                    }, {
                        SeriesType: null,
                        Live: (0, validators_1.getInLiveStatus)(series.Live),
                    });
                }
            }
            await manager.delete(tag_entity_1.Tag, {
                TagID: (0, typeorm_2.In)(ids),
                Use: (0, typeorm_2.In)([DataStateEnum_1.Use.New, DataStateEnum_1.Use.Broken]),
                Live: (0, typeorm_2.In)([DataStateEnum_1.Live.New]),
            });
            await manager.delete(slidetag_entity_1.SlideTag, {
                TagID: (0, typeorm_2.In)(ids),
            });
            return await manager.update(tag_entity_1.Tag, {
                TagID: (0, typeorm_2.In)(ids),
                Live: (0, typeorm_2.In)([DataStateEnum_1.Live.Live, DataStateEnum_1.Live.Pending]),
            }, {
                UseCount: 0,
                Use: DataStateEnum_1.Use.Deleted,
                Live: DataStateEnum_1.Live.Pending,
            });
        });
    }
    async dropdown(IsSeriesType) {
        return await this.tagsRepository.findBy(IsSeriesType
            ? {
                IsSeriesType: true,
                Use: (0, typeorm_2.Not)(DataStateEnum_1.Use.Deleted),
            }
            : { Use: (0, typeorm_2.Not)(DataStateEnum_1.Use.Deleted) });
    }
    async updateTagCounter(entityManager, tagToUpdate) {
        for (const tagId of tagToUpdate) {
            const seriesCount = await entityManager.countBy(series_entity_1.Series, {
                SeriesType: tagId,
                Use: (0, typeorm_2.Not)(DataStateEnum_1.Use.Deleted),
            });
            const sectionCount = await entityManager.countBy(section_entity_1.Section, {
                Tags: {
                    TagID: tagId,
                },
                Use: (0, typeorm_2.Not)(DataStateEnum_1.Use.Deleted),
            });
            const slideCount = await entityManager.countBy(slide_entity_1.Slide, {
                Tags: {
                    TagID: tagId,
                },
                Use: (0, typeorm_2.Not)(DataStateEnum_1.Use.Deleted),
            });
            await entityManager.update(tag_entity_1.Tag, {
                TagID: tagId,
            }, {
                UseCount: seriesCount + sectionCount + slideCount,
            });
        }
    }
    async download(res) {
        const data = await this.tagsRepository.find({
            relations: {
                Slides: true,
                Sections: true,
            },
        });
        const workbook = new exceljs_1.Workbook();
        await workbook.xlsx.readFile((0, path_1.resolve)("templates", "exports", "20231109_Download_Tag_V0.1.xlsx"));
        const worksheet = workbook.getWorksheet(1);
        const timeCell = worksheet.getCell("F1");
        timeCell.value = new Date();
        const startRow = 5;
        data.forEach((r, i) => {
            worksheet.insertRow(startRow + i, [
                i + 1,
                r.Name,
                r.Use,
                r.Live,
                r.IsSeriesType ? "Y" : "N",
                r.Slides.length + r.Sections.length,
                r.UpdatedDate,
            ]);
            worksheet.getRow(startRow + i).getCell(7).numFmt = "dd/mmm/yyyy hh:mm:ss";
        });
        return workbook.xlsx.write(res);
    }
};
TagsService = TagsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectDataSource)(db_1.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        tags_repository_1.TagsRepository])
], TagsService);
exports.TagsService = TagsService;
//# sourceMappingURL=tags.service.js.map