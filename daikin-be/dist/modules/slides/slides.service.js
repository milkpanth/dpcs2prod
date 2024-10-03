"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlidesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exceljs_1 = require("exceljs");
const nestjs_azure_storage_blob_1 = require("nestjs-azure-storage-blob");
const path_1 = require("path");
const dist_1 = __importStar(require("pptx-automizer/dist"));
const qrcode_1 = __importDefault(require("qrcode"));
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const cloudconvert_service_1 = require("../../shared/cloudconvert/cloudconvert.service");
const db_1 = require("../../shared/constants/db");
const file_1 = require("../../shared/constants/file");
const dto_1 = require("../../shared/decorators/response-template/dto");
const AzureStorageEnum_1 = require("../../shared/enum/AzureStorageEnum");
const database_type_enum_1 = require("../../shared/enum/database-type.enum");
const DataStateEnum_1 = require("../../shared/enum/DataStateEnum");
const before_update_status_inlive_1 = require("../../utils/before-update-status-inlive");
const before_update_status_inuse_1 = require("../../utils/before-update-status-inuse");
const company_helper_1 = require("../../utils/company-helper");
const validators_1 = require("../../utils/validators");
const company_entity_1 = require("../companies/entities/company.entity");
const slidefile_entity_1 = require("../slidefiles/entities/slidefile.entity");
const slidefiles_archive_entity_1 = require("../slidefiles/entities/slidefiles_archive.entity");
const slidetag_entity_1 = require("../slidetags/entities/slidetag.entity");
const tag_entity_1 = require("../tags/entities/tag.entity");
const tags_service_1 = require("../tags/tags.service");
const slide_entity_1 = require("./entities/slide.entity");
const slide_files_archive_repository_1 = require("./slide-files-archive.repository");
const slide_files_repository_1 = require("./slide-files.repository");
const slides_repository_1 = require("./slides.repository");
let SlidesService = class SlidesService {
    constructor(useSlidesRepository, liveSlidesRepository, useSlideFilesRepository, useSlideFileArchivesRepository, useCompanyRepository, dataSource, storageBlobService, cloudConvertService, tagsService, slideRepo, slideFilesRepo, slideFilesArchiveRepo) {
        this.useSlidesRepository = useSlidesRepository;
        this.liveSlidesRepository = liveSlidesRepository;
        this.useSlideFilesRepository = useSlideFilesRepository;
        this.useSlideFileArchivesRepository = useSlideFileArchivesRepository;
        this.useCompanyRepository = useCompanyRepository;
        this.dataSource = dataSource;
        this.storageBlobService = storageBlobService;
        this.cloudConvertService = cloudConvertService;
        this.tagsService = tagsService;
        this.slideRepo = slideRepo;
        this.slideFilesRepo = slideFilesRepo;
        this.slideFilesArchiveRepo = slideFilesArchiveRepo;
    }
    async create(createArraySlideDto) {
        return await this.dataSource.transaction(async (manager) => {
            const relatedTag = new Set();
            const allCreateSlide = await Promise.all(createArraySlideDto.map(async (d) => {
                const { SelectedSlideTag, Language, Path, SlideTotalPage } = d, data = __rest(d, ["SelectedSlideTag", "Language", "Path", "SlideTotalPage"]);
                if (SlideTotalPage < 1) {
                    throw new common_1.UnprocessableEntityException("SlideTotalPage must greater than 0");
                }
                const slide = await manager.save(slide_entity_1.Slide, Object.assign(Object.assign({}, data), { Use: SelectedSlideTag.length > 0 ? DataStateEnum_1.Use.New : DataStateEnum_1.Use.Broken, Live: DataStateEnum_1.Live.New }));
                await manager
                    .createQueryBuilder()
                    .relation(tag_entity_1.Tag, "Slides")
                    .of(SelectedSlideTag)
                    .add(slide);
                await manager.save(slidefile_entity_1.SlideFile, {
                    SlideID: slide.SlideID,
                    Language,
                    Path,
                    SlideTotalPage,
                    Version: 1,
                });
                SelectedSlideTag.forEach(relatedTag.add, relatedTag);
                return slide;
            }));
            await this.tagsService.updateTagCounter(manager, relatedTag);
            return allCreateSlide;
        });
    }
    async findAll(graphUser, queryPayload) {
        const dbType = queryPayload.live
            ? database_type_enum_1.DataBaseTypeEnum.LIVE
            : database_type_enum_1.DataBaseTypeEnum.USE;
        let slideList = await this.slideRepo.findAll(queryPayload, graphUser, dbType);
        if (slideList.meta.totalItems > 0 && slideList.items.length === 0) {
            queryPayload.page = 1;
            slideList = await this.slideRepo.findAll(queryPayload, graphUser, dbType);
        }
        return slideList;
    }
    findSlideByName(searchDto) {
        const companyFilter = {};
        if (typeof searchDto.company !== "undefined") {
            companyFilter.CompanyCode = searchDto.company;
        }
        return this.useSlidesRepository.find({
            relations: {
                Section: true,
                Tags: true,
                SlideFiles: {
                    Likes: true,
                },
                SlideFileArchives: {
                    Likes: true,
                },
                Company: true,
            },
            where: Object.assign({ FileName: searchDto.exact
                    ? searchDto.keyword
                    : (0, typeorm_2.Like)(`%${searchDto.keyword}%`) }, companyFilter),
        });
    }
    findSlideById(ids) {
        return this.useSlidesRepository.find({
            relations: {
                Section: true,
                Tags: true,
                SlideFiles: {
                    Likes: true,
                },
                SlideFileArchives: {
                    Likes: true,
                },
                Company: true,
            },
            where: {
                SlideID: (0, typeorm_2.In)(ids),
            },
        });
    }
    async update(updateArraySlideDto) {
        return await this.dataSource.transaction(async (manager) => {
            const relatedTag = new Set();
            const allUpdateSlide = await Promise.all(updateArraySlideDto.map(async (d) => {
                if (!d.CompanyCode)
                    d.CompanyCode = null;
                const { SelectedSlideTag, Language, SlideTotalPage, NewFileName, IsEOL, DeletedSlideFiles, Path } = d, data = __rest(d, ["SelectedSlideTag", "Language", "SlideTotalPage", "NewFileName", "IsEOL", "DeletedSlideFiles", "Path"]);
                if (SlideTotalPage < 1) {
                    throw new common_1.UnprocessableEntityException("SlideTotalPage must greater than 0");
                }
                const slide = await manager.findOne(slide_entity_1.Slide, {
                    relations: { SlideFiles: true, Tags: true, Section: true },
                    where: {
                        SlideID: data.SlideID,
                    },
                });
                if (!slide) {
                    throw new common_1.NotFoundException("No Slide to update!");
                }
                let slideTags = await manager.find(slidetag_entity_1.SlideTag, {
                    where: {
                        SlideID: data.SlideID,
                    },
                });
                slideTags = slideTags.filter((slideTag) => !SelectedSlideTag.includes(slideTag.TagID));
                for (const slideTag of slideTags) {
                    const tag = await manager.findOne(tag_entity_1.Tag, {
                        where: {
                            TagID: slideTag.TagID,
                        },
                    });
                    await manager.update(tag_entity_1.Tag, { TagID: tag.TagID }, {
                        Use: (0, validators_1.getInUseStatus)(tag.Live, tag.Use),
                    });
                }
                await manager
                    .createQueryBuilder()
                    .relation(slide_entity_1.Slide, "Tags")
                    .of(slide)
                    .addAndRemove(SelectedSlideTag, slide.Tags);
                if (DeletedSlideFiles.length > 0) {
                    await manager.delete(slidefile_entity_1.SlideFile, {
                        FileID: (0, typeorm_2.In)(DeletedSlideFiles),
                        SlideID: data.SlideID,
                    });
                }
                if (Path && !slide.SlideFiles.some((f) => f.Path == Path)) {
                    const latestFile = await manager.findOne(slidefile_entity_1.SlideFile, {
                        where: {
                            Language: d.Language,
                            SlideID: data.SlideID,
                        },
                        order: { Version: "DESC" },
                    });
                    if (latestFile) {
                        await this.slideFilesArchiveRepo.deleteBySlideId(latestFile.SlideID, database_type_enum_1.DataBaseTypeEnum.USE);
                        await manager.upsert(slidefiles_archive_entity_1.SlideFileArchive, latestFile, [
                            "SlideID",
                            "Language",
                        ]);
                        await manager.delete(slidefile_entity_1.SlideFile, { FileID: latestFile.FileID });
                    }
                    await manager.upsert(slidefile_entity_1.SlideFile, {
                        SlideID: data.SlideID,
                        Language,
                        Path: Path,
                        SlideTotalPage,
                        Version: latestFile ? latestFile.Version + 1 : 1,
                    }, ["SlideID", "Language"]);
                }
                slide.Tags.forEach((ct) => relatedTag.add(ct.TagID));
                SelectedSlideTag.forEach((st) => relatedTag.add(st));
                return await manager.update(slide_entity_1.Slide, {
                    SlideID: data.SlideID,
                }, Object.assign(Object.assign({}, data), { FileName: NewFileName || data.FileName, Use: (0, before_update_status_inuse_1.beforeUpdateStatusInUse)(SelectedSlideTag.length, slide.Live, IsEOL), Live: (0, before_update_status_inlive_1.beforeUpdateStatusInLive)(SelectedSlideTag.length > 0, slide.Live) }));
            }));
            await this.tagsService.updateTagCounter(manager, relatedTag);
            return allUpdateSlide;
        });
    }
    async remove(fileIds) {
        return await this.dataSource.transaction(async (manager) => {
            const matchSlideFiles = await manager.findBy(slidefile_entity_1.SlideFile, {
                FileID: (0, typeorm_2.In)(fileIds),
            });
            await manager.delete(slidefile_entity_1.SlideFile, {
                FileID: (0, typeorm_2.In)(fileIds),
            });
            const slideData = await manager.find(slide_entity_1.Slide, {
                relations: {
                    SlideFiles: true,
                },
                where: {
                    SlideID: (0, typeorm_2.In)(matchSlideFiles.map((sf) => sf.SlideID)),
                },
            });
            const slideToRemove = slideData
                .filter((s) => s.SlideFiles.length == 0)
                .map((s) => s.SlideID);
            const slides = await manager.find(slide_entity_1.Slide, {
                relations: {
                    Tags: true,
                },
                where: {
                    SlideID: (0, typeorm_2.In)(slideToRemove),
                    Use: (0, typeorm_2.In)([DataStateEnum_1.Use.New, DataStateEnum_1.Use.Broken]),
                    Live: (0, typeorm_2.In)([DataStateEnum_1.Live.New]),
                },
            });
            await manager.remove(slides);
            const allDeleteSlide = await manager.update(slide_entity_1.Slide, {
                SlideID: (0, typeorm_2.In)(slideToRemove),
                Live: (0, typeorm_2.In)([DataStateEnum_1.Live.Live, DataStateEnum_1.Live.Pending]),
            }, {
                Use: DataStateEnum_1.Use.Deleted,
                Live: DataStateEnum_1.Live.Pending,
            });
            const relatedTag = new Set();
            slides.forEach((s) => s.Tags.forEach((t) => relatedTag.add(t.TagID)));
            await this.tagsService.updateTagCounter(manager, relatedTag);
            return allDeleteSlide;
        });
    }
    async rollbackToPreviousVersion(setSlidePreviousDto) {
        const slideID = setSlidePreviousDto.SlideID;
        const language = setSlidePreviousDto.Language;
        const slideFilesArchiveLastedVersion = await this.slideFilesArchiveRepo.getLastedVersion(slideID, language, database_type_enum_1.DataBaseTypeEnum.USE);
        if (!slideFilesArchiveLastedVersion)
            throw new dto_1.NotFoundErrorException({ message: "No slide files" });
        const deletedSlideFile = await this.slideFilesRepo.deleteBySlideId(slideFilesArchiveLastedVersion.SlideID, database_type_enum_1.DataBaseTypeEnum.USE);
        if (deletedSlideFile) {
            const deletedLessVersionForArchive = await this.slideFilesArchiveRepo.deleteSlideLessVersion(slideFilesArchiveLastedVersion.SlideID, slideFilesArchiveLastedVersion.Version, database_type_enum_1.DataBaseTypeEnum.USE);
            if (!deletedLessVersionForArchive) {
                throw new dto_1.NotFoundErrorException({
                    message: "No slide files archive with less version",
                });
            }
        }
        if (deletedSlideFile) {
            await this.slideFilesArchiveRepo.deleteByFileId(slideFilesArchiveLastedVersion.FileID, database_type_enum_1.DataBaseTypeEnum.USE);
        }
        const updatedSlideFile = await this.slideFilesRepo.insertOrUpsert(slideFilesArchiveLastedVersion, database_type_enum_1.DataBaseTypeEnum.USE);
        const slide = await this.slideRepo.findOneWithWhereConditions({ SlideID: slideID }, database_type_enum_1.DataBaseTypeEnum.USE);
        await this.slideRepo.insertOrUpsert(Object.assign(Object.assign({}, slide), { Use: (0, validators_1.getInUseStatus)(slide.Live, slide.Use), Live: (0, validators_1.getInLiveStatus)(slide.Live) }), database_type_enum_1.DataBaseTypeEnum.USE);
        return updatedSlideFile;
    }
    async upload(file) {
        const client = this.storageBlobService
            .getClient()
            .getContainerClient(AzureStorageEnum_1.ContainerEnum.Media);
        const { ext } = (0, path_1.parse)(file.originalname);
        const filename = (0, uuid_1.v4)() + ext;
        const blockBlobClient = client.getBlockBlobClient(filename);
        await blockBlobClient.uploadData(file.buffer, {
            blobHTTPHeaders: {
                blobContentType: file.mimetype,
            },
        });
        const { id } = await this.cloudConvertService.slideToThumbnail(filename);
        return {
            blobName: filename,
            jobId: id,
        };
    }
    async getSlideToThumbnailStatus(jobId) {
        return await this.cloudConvertService.getJobStatus(jobId);
    }
    async downloadThumbnail(name) {
        const client = this.storageBlobService
            .getClient()
            .getContainerClient(AzureStorageEnum_1.ContainerEnum.Screenshot);
        const blockBlobClient = client.getBlockBlobClient(name);
        const blobResponse = await blockBlobClient.download();
        return new common_1.StreamableFile(blobResponse.readableStreamBody, {
            type: blobResponse.contentType,
        });
    }
    async downloadSlide(name) {
        const getSlideFile = async () => {
            const slideFileCurrent = await this.useSlideFilesRepository.findOneBy({
                Path: name,
            });
            if (slideFileCurrent) {
                return slideFileCurrent;
            }
            const slideFileArchive = await this.useSlideFileArchivesRepository.findOneBy({
                Path: name,
            });
            if (slideFileArchive) {
                return slideFileArchive;
            }
            return null;
        };
        const slideFile = await getSlideFile();
        if (!slideFile) {
            throw new common_1.NotFoundException("SlideFile Not Found!");
        }
        const client = this.storageBlobService
            .getClient()
            .getContainerClient(AzureStorageEnum_1.ContainerEnum.Media);
        const blockBlobClient = client.getBlockBlobClient(name);
        const blobResponse = await blockBlobClient.download();
        return new common_1.StreamableFile(blobResponse.readableStreamBody, {
            type: blobResponse.contentType,
            disposition: `attachment; filename="${slideFile.SlideID}.pptx"`,
        });
    }
    async download(graphUser, companyQuery, res) {
        const getTagNameAtIndex = (tags, index) => {
            if (!tags) {
                return "";
            }
            const tag = tags.at(index);
            return tag ? tag.Name : "";
        };
        const data = await this.useSlideFilesRepository.find({
            where: {
                Slide: (0, company_helper_1.companyWhereFilter)(graphUser.user, companyQuery.company || (0, typeorm_2.IsNull)()),
            },
            relations: {
                Slide: {
                    Section: true,
                    Tags: true,
                },
            },
        });
        const company = await this.useCompanyRepository.findOneBy((0, company_helper_1.companyWhereFilter)(graphUser.user, companyQuery.company || (0, typeorm_2.IsNull)()));
        const workbook = new exceljs_1.Workbook();
        await workbook.xlsx.readFile((0, path_1.resolve)("templates", "exports", "20231109_Download_Slides_V0.1.xlsx"));
        const worksheet = workbook.getWorksheet(1);
        const timeCell = worksheet.getCell("F1");
        timeCell.value = new Date();
        const libCell = worksheet.getCell("C1");
        libCell.value = company ? company.Abbreviation : "GLOBAL";
        const startRow = 5;
        data.forEach((r, i) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            worksheet.insertRow(startRow + i, [
                i + 1,
                (_a = r.Slide) === null || _a === void 0 ? void 0 : _a.FileName,
                (_b = r.Slide) === null || _b === void 0 ? void 0 : _b.Use,
                (_c = r.Slide) === null || _c === void 0 ? void 0 : _c.Live,
                (_d = r.Slide) === null || _d === void 0 ? void 0 : _d.DisplayName,
                r.Language,
                (_f = (_e = r.Slide) === null || _e === void 0 ? void 0 : _e.Section) === null || _f === void 0 ? void 0 : _f.Name,
                getTagNameAtIndex((_g = r.Slide) === null || _g === void 0 ? void 0 : _g.Tags, 0),
                getTagNameAtIndex((_h = r.Slide) === null || _h === void 0 ? void 0 : _h.Tags, 1),
                getTagNameAtIndex((_j = r.Slide) === null || _j === void 0 ? void 0 : _j.Tags, 2),
                getTagNameAtIndex((_k = r.Slide) === null || _k === void 0 ? void 0 : _k.Tags, 3),
                getTagNameAtIndex((_l = r.Slide) === null || _l === void 0 ? void 0 : _l.Tags, 4),
                getTagNameAtIndex((_m = r.Slide) === null || _m === void 0 ? void 0 : _m.Tags, 5),
                getTagNameAtIndex((_o = r.Slide) === null || _o === void 0 ? void 0 : _o.Tags, 6),
                getTagNameAtIndex((_p = r.Slide) === null || _p === void 0 ? void 0 : _p.Tags, 7),
                getTagNameAtIndex((_q = r.Slide) === null || _q === void 0 ? void 0 : _q.Tags, 8),
                (_r = r.Slide) === null || _r === void 0 ? void 0 : _r.UpdatedDate,
            ]);
            worksheet.getRow(startRow + i).getCell(17).numFmt =
                "dd/mmm/yyyy hh:mm:ss";
        });
        return workbook.xlsx.write(res);
    }
    async dropdown(graphUser, query) {
        return await this.useSlidesRepository.find({
            where: (0, company_helper_1.companyWhereFilter)(graphUser.user, query.company || (0, typeorm_2.IsNull)()),
        });
    }
    async slideTags(companyDto) {
        const tagsArray = new Array();
        const matchSlides = await this.useSlidesRepository.find({
            select: ["SlideID"],
            relations: {
                Tags: true,
            },
            where: {
                CompanyCode: companyDto.company || (0, typeorm_2.IsNull)(),
            },
        });
        matchSlides.forEach((s) => {
            s.Tags.forEach((t) => {
                if (!tagsArray.some((at) => at.TagID == t.TagID)) {
                    tagsArray.push(t);
                }
            });
        });
        tagsArray.sort((a, b) => (a.TagID > b.TagID ? 1 : -1));
        return tagsArray;
    }
    async createBimSlide(qrBimDto) {
        const uid = (0, uuid_1.v4)();
        const qrFileName = `QR_${uid}.png`;
        await qrcode_1.default.toFile(`${file_1.TEMP_OUTPUT}/${qrFileName}`, qrBimDto.Text);
        return this.createBIMSlide(qrFileName, qrBimDto.Text, uid);
    }
    async createBIMSlide(qrImg, textDesc, uid) {
        const automizer = new dist_1.default({
            templateDir: file_1.TEMPLATE_DIR,
            removeExistingSlides: true,
            outputDir: file_1.TEMP_OUTPUT,
        });
        const pres = automizer
            .loadRoot("BIM.pptx")
            .load("BIM.pptx", "BIM")
            .loadMedia(qrImg, file_1.TEMP_OUTPUT);
        pres.addSlide("BIM", 1, (slide) => {
            slide.modifyElement("Rectangle 5", [dist_1.ModifyTextHelper.setText(textDesc)]);
            slide.modifyElement("Picture 6", [
                dist_1.ModifyImageHelper.setRelationTarget(qrImg),
            ]);
        });
        const bimFileName = `BIM_${uid}.pptx`;
        await pres.write(bimFileName);
        const blockBlobClient = this.storageBlobService
            .getClient()
            .getContainerClient(AzureStorageEnum_1.ContainerEnum.Media)
            .getBlockBlobClient(bimFileName);
        await blockBlobClient.uploadFile(`${file_1.TEMP_OUTPUT}/${bimFileName}`, {
            blobHTTPHeaders: {
                blobContentType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            },
        });
        const { id } = await this.cloudConvertService.slideToThumbnail(bimFileName);
        return {
            blobName: bimFileName,
            jobId: id,
        };
    }
};
SlidesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(slide_entity_1.Slide, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(slide_entity_1.Slide, db_1.LIVE_DB_NAME)),
    __param(2, (0, typeorm_1.InjectRepository)(slidefile_entity_1.SlideFile, db_1.USE_DB_NAME)),
    __param(3, (0, typeorm_1.InjectRepository)(slidefiles_archive_entity_1.SlideFileArchive, db_1.USE_DB_NAME)),
    __param(4, (0, typeorm_1.InjectRepository)(company_entity_1.Company, db_1.USE_DB_NAME)),
    __param(5, (0, typeorm_1.InjectDataSource)(db_1.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        nestjs_azure_storage_blob_1.AzureStorageBlobService,
        cloudconvert_service_1.CloudConvertService,
        tags_service_1.TagsService,
        slides_repository_1.SlidesRepository,
        slide_files_repository_1.SlideFilesRepository,
        slide_files_archive_repository_1.SlideFilesArchiveRepository])
], SlidesService);
exports.SlidesService = SlidesService;
//# sourceMappingURL=slides.service.js.map