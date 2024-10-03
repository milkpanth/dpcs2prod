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
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exceljs_1 = require("exceljs");
const nestjs_azure_storage_blob_1 = require("nestjs-azure-storage-blob");
const path_1 = require("path");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const db_1 = require("../../shared/constants/db");
const AzureStorageEnum_1 = require("../../shared/enum/AzureStorageEnum");
const database_type_enum_1 = require("../../shared/enum/database-type.enum");
const DataStateEnum_1 = require("../../shared/enum/DataStateEnum");
const before_update_status_inlive_1 = require("../../utils/before-update-status-inlive");
const before_update_status_inuse_1 = require("../../utils/before-update-status-inuse");
const validators_1 = require("../../utils/validators");
const model_entity_1 = require("../models/entities/model.entity");
const model_repository_1 = require("../models/model.repository");
const image_entity_1 = require("./entities/image.entity");
const images_repository_1 = require("./images.repository");
let ImagesService = class ImagesService {
    constructor(useImagesRepository, liveImagesRepository, storageBlobService, dataSource, imageRepo, modelRepo) {
        this.useImagesRepository = useImagesRepository;
        this.liveImagesRepository = liveImagesRepository;
        this.storageBlobService = storageBlobService;
        this.dataSource = dataSource;
        this.imageRepo = imageRepo;
        this.modelRepo = modelRepo;
    }
    async create(createArrayImageDto) {
        return await this.dataSource.transaction(async (manager) => await Promise.all(createArrayImageDto.map(async (d) => {
            const { SelectedModel, BrokenModel } = d, data = __rest(d, ["SelectedModel", "BrokenModel"]);
            if (BrokenModel.length > 0) {
                await manager
                    .createQueryBuilder()
                    .relation(model_entity_1.Model, "Image")
                    .of(BrokenModel)
                    .set(null);
            }
            const image = await manager.save(image_entity_1.Image, Object.assign(Object.assign({}, data), { Use: SelectedModel.length > 0 ? DataStateEnum_1.Use.New : DataStateEnum_1.Use.Broken, Live: DataStateEnum_1.Live.New, UseCount: SelectedModel.length }));
            await manager.update(model_entity_1.Model, { Name: (0, typeorm_2.In)(SelectedModel) }, { ImageID: image.ImageID });
            return image;
        })));
    }
    async findAll(queryPayload) {
        const dbType = queryPayload.live
            ? database_type_enum_1.DataBaseTypeEnum.LIVE
            : database_type_enum_1.DataBaseTypeEnum.USE;
        let imageList = await this.imageRepo.findAll(queryPayload, dbType);
        if (imageList.meta.totalItems > 0 && imageList.items.length === 0) {
            queryPayload.page = 1;
            imageList = await this.imageRepo.findAll(queryPayload, dbType);
        }
        return imageList;
    }
    findById(id) {
        return this.useImagesRepository.findOne({
            relations: {
                Models: true,
            },
            where: {
                ImageID: id,
            },
        });
    }
    findImageByName(searchDto) {
        return searchDto.exact
            ? this.useImagesRepository.findOne({
                relations: {
                    Models: true,
                },
                where: {
                    Name: searchDto.keyword,
                },
            })
            : this.useImagesRepository.find({
                relations: {
                    Models: true,
                },
                where: {
                    Name: (0, typeorm_2.Like)(`%${searchDto.keyword}%`),
                },
            });
    }
    async update(updateArrayImageDto) {
        return await this.dataSource.transaction(async (manager) => {
            return await Promise.all(updateArrayImageDto.map(async (updateImage) => {
                const { SelectedModel, BrokenModel, IsEOL } = updateImage, data = __rest(updateImage, ["SelectedModel", "BrokenModel", "IsEOL"]);
                if (BrokenModel.length > 0) {
                    await manager
                        .createQueryBuilder()
                        .relation(model_entity_1.Model, "Image")
                        .of(BrokenModel)
                        .set(null);
                }
                const image = await this.imageRepo.findOneWithWhereConditions({ ImageID: data.ImageID }, database_type_enum_1.DataBaseTypeEnum.USE, { Models: true });
                for (const model of image.Models) {
                    await this.modelRepo.insertOrUpsert(Object.assign(Object.assign({}, model), { ImageID: null }), database_type_enum_1.DataBaseTypeEnum.USE);
                }
                const modelList = await this.modelRepo.findWithWhereConditions({ Name: (0, typeorm_2.In)(SelectedModel) }, database_type_enum_1.DataBaseTypeEnum.USE);
                const imageIds = [];
                for (const model of modelList) {
                    if (model.ImageID !== data.ImageID) {
                        imageIds.push(model.ImageID);
                        await this.modelRepo.insertOrUpsert(Object.assign(Object.assign({}, model), { ImageID: data.ImageID }), database_type_enum_1.DataBaseTypeEnum.USE);
                        continue;
                    }
                }
                for (const id of imageIds) {
                    const modelList = await this.modelRepo.findWithWhereConditions({ ImageID: id }, database_type_enum_1.DataBaseTypeEnum.USE);
                    const image = await this.imageRepo.findOneWithWhereConditions({ ImageID: id }, database_type_enum_1.DataBaseTypeEnum.USE, { Models: true });
                    await manager.update(image_entity_1.Image, {
                        ImageID: id,
                    }, {
                        UseCount: modelList.length,
                        Use: modelList.length === 0
                            ? (0, validators_1.getInUseStatusWithDeletedOrBroken)(image.Use)
                            : (0, validators_1.getInUseStatus)(image.Live, image.Use),
                        Live: (0, validators_1.getInLiveStatus)(image.Live),
                    });
                }
                return await manager.update(image_entity_1.Image, {
                    ImageID: data.ImageID,
                }, Object.assign(Object.assign({}, data), { UseCount: SelectedModel.length, Use: (0, before_update_status_inuse_1.beforeUpdateStatusInUse)(SelectedModel.length > 0, image.Live, IsEOL), Live: (0, before_update_status_inlive_1.beforeUpdateStatusInLive)(SelectedModel.length > 0, image.Live) }));
            }));
        });
    }
    async remove(ids) {
        return await this.dataSource.transaction(async (manager) => {
            await manager.update(model_entity_1.Model, {
                ImageID: (0, typeorm_2.In)(ids),
            }, {
                ImageID: null,
            });
            await manager.delete(image_entity_1.Image, {
                ImageID: (0, typeorm_2.In)(ids),
                Use: (0, typeorm_2.In)([DataStateEnum_1.Use.New, DataStateEnum_1.Use.Broken]),
                Live: DataStateEnum_1.Live.New,
            });
            return await manager.update(image_entity_1.Image, {
                ImageID: (0, typeorm_2.In)(ids),
            }, {
                Use: DataStateEnum_1.Use.Deleted,
                Live: DataStateEnum_1.Live.Pending,
            });
        });
    }
    async upload(file) {
        const client = this.storageBlobService
            .getClient()
            .getContainerClient(AzureStorageEnum_1.ContainerEnum.Equipment);
        const { ext } = (0, path_1.parse)(file.originalname);
        const filename = (0, uuid_1.v4)() + ext;
        const blockBlobClient = client.getBlockBlobClient(filename);
        await blockBlobClient.uploadData(file.buffer, {
            blobHTTPHeaders: {
                blobContentType: file.mimetype,
            },
        });
        return filename;
    }
    async downloadImage(name) {
        const client = this.storageBlobService
            .getClient()
            .getContainerClient(AzureStorageEnum_1.ContainerEnum.Equipment);
        const blockBlobClient = client.getBlockBlobClient(name);
        const blobResponse = await blockBlobClient.download();
        return new common_1.StreamableFile(blobResponse.readableStreamBody, {
            type: blobResponse.contentType,
        });
    }
    async download(res) {
        const data = await this.useImagesRepository.find({
            relations: {
                Models: true,
            },
        });
        const workbook = new exceljs_1.Workbook();
        await workbook.xlsx.readFile((0, path_1.resolve)("templates", "exports", "20231109_Download_Image_V0.1.xlsx"));
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
                r.File ? "Y" : "N",
                r.Models.length,
                r.UpdatedDate,
            ]);
            worksheet.getRow(startRow + i).getCell(7).numFmt = "dd/mmm/yyyy hh:mm:ss";
        });
        return workbook.xlsx.write(res);
    }
    async exportModelLinkEditImage(res, exportModelLinkImageDto) {
        var _a;
        const imageData = await this.useImagesRepository.findOne({
            relations: {
                Models: true,
            },
            where: { ImageID: exportModelLinkImageDto.SelectedImage },
        });
        const workbook = new exceljs_1.Workbook();
        await workbook.xlsx.readFile((0, path_1.resolve)("templates", "ImageMgmt_EditImage_ModelList_v0.5-TBC.xlsx"));
        const worksheet = workbook.getWorksheet(1);
        const startRow = 7;
        const nameCell = worksheet.getCell("C2");
        nameCell.value = imageData === null || imageData === void 0 ? void 0 : imageData.Name;
        (_a = imageData.Models) === null || _a === void 0 ? void 0 : _a.forEach((m, i) => {
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
        return await this.useImagesRepository.find({
            relations: {
                Models: true,
            },
            where: {
                Use: (0, typeorm_2.Not)(DataStateEnum_1.Use.Deleted),
            },
        });
    }
    async updateImageCounter(entityManager, imageToUpdate) {
        for (const imageId of imageToUpdate) {
            const modelCount = await entityManager.countBy(model_entity_1.Model, {
                ImageID: imageId,
                Use: (0, typeorm_2.Not)(DataStateEnum_1.Use.Deleted),
            });
            await entityManager.update(image_entity_1.Image, {
                ImageID: imageId,
            }, {
                UseCount: modelCount,
            });
        }
    }
};
ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(image_entity_1.Image, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(image_entity_1.Image, db_1.LIVE_DB_NAME)),
    __param(3, (0, typeorm_1.InjectDataSource)(db_1.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        nestjs_azure_storage_blob_1.AzureStorageBlobService,
        typeorm_2.DataSource,
        images_repository_1.ImagesRepository,
        model_repository_1.ModelRepository])
], ImagesService);
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map