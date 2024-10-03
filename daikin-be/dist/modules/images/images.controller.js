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
exports.ImagesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const auth_1 = require("../../shared/constants/auth");
const response_template_1 = require("../../shared/decorators/response-template");
const dto_1 = require("../../shared/decorators/response-template/dto");
const pagination_query_dto_1 = require("../../shared/dto/pagination-query.dto");
const search_query_dto_1 = require("../../shared/dto/search-query.dto");
const create_image_dto_1 = require("./dto/create-image.dto");
const export_modellink_dto_1 = require("./dto/export-modellink.dto");
const storage_object_dto_1 = require("./dto/storage-object.dto");
const update_image_dto_1 = require("./dto/update-image.dto");
const image_entity_1 = require("./entities/image.entity");
const images_service_1 = require("./images.service");
let ImagesController = class ImagesController {
    constructor(imagesService) {
        this.imagesService = imagesService;
    }
    create(createArrayImageDto) {
        return this.imagesService.create(createArrayImageDto);
    }
    async uploadFile(file) {
        return this.imagesService.upload(file);
    }
    dropdown() {
        return this.imagesService.dropdown();
    }
    async downloadFile(name) {
        return this.imagesService.downloadImage(name);
    }
    findAll(query) {
        return this.imagesService.findAll(query);
    }
    findById(id) {
        return this.imagesService.findById(id);
    }
    findByName(searchDto) {
        return this.imagesService.findImageByName(searchDto);
    }
    update(updateArrayImageDto) {
        return this.imagesService.update(updateArrayImageDto);
    }
    remove(ids) {
        return this.imagesService.remove(ids);
    }
    download(res) {
        const date = new Date();
        res.set({
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="${date.getTime()}.xlsx"`,
        });
        return this.imagesService.download(res);
    }
    modelLinkEditImage(exportModelLinkImageDto, res) {
        const date = new Date();
        res.set({
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="${date.getTime()}.xlsx"`,
        });
        return this.imagesService.exportModelLinkEditImage(res, exportModelLinkImageDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "Create images",
        description: "Create images",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: image_entity_1.Image,
        description: "Response created",
    }),
    (0, swagger_1.ApiBody)({ type: create_image_dto_1.CreateImageDto, isArray: true }),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: create_image_dto_1.CreateImageDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("upload"),
    (0, swagger_1.ApiOperation)({
        summary: "Upload images",
        description: "Upload images",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "Response uploaded and return file name (type is string)",
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({ type: storage_object_dto_1.StorageObjectDto }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)("dropdown"),
    (0, swagger_1.ApiOperation)({
        summary: "Get dropdown images",
        description: "Get list dropdown image",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: image_entity_1.Image,
        description: "Response get list dropdown image",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "dropdown", null);
__decorate([
    (0, common_1.Get)("download/:name"),
    (0, swagger_1.ApiOperation)({
        summary: "Download image by file name",
        description: "Download image by file name",
    }),
    (0, common_1.SetMetadata)(auth_1.ALLOW_UNAUTHORIZED_KEY, true),
    __param(0, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get images",
        description: "Get list image",
    }),
    (0, response_template_1.ApiPaginatedTemplateResponse)({
        model: image_entity_1.Image,
        description: "Response get list image",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Get image by id",
        description: "Get image bu id",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: image_entity_1.Image,
        description: "Response get image by id",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)("find"),
    (0, swagger_1.ApiOperation)({
        summary: "Get images",
        description: "Get list image by name",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: image_entity_1.Image,
        description: "Response get list image by name",
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_query_dto_1.SearchDto]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "findByName", null);
__decorate([
    (0, common_1.Patch)("update"),
    (0, swagger_1.ApiOperation)({
        summary: "Update images",
        description: "Update images",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response updated",
    }),
    (0, swagger_1.ApiBody)({ type: update_image_dto_1.UpdateImageDto, isArray: true }),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: update_image_dto_1.UpdateImageDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete images",
        description: "Delete image by ids",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.DeleteResultResponseDto,
        description: "Response deleted",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("excel/download"),
    (0, swagger_1.ApiOperation)({
        summary: "Download image for Excel file",
        description: "Download image for Excel file",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "No content response",
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "download", null);
__decorate([
    (0, common_1.Post)("excel/modelLink/editImage"),
    (0, swagger_1.ApiOperation)({
        summary: "Export model link for edit image",
        description: "Export model link for edit image",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "No content response",
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_modellink_dto_1.ExportModelLinkImageDto, Object]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "modelLinkEditImage", null);
ImagesController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("Image"),
    (0, common_1.Controller)("images"),
    __metadata("design:paramtypes", [images_service_1.ImagesService])
], ImagesController);
exports.ImagesController = ImagesController;
//# sourceMappingURL=images.controller.js.map