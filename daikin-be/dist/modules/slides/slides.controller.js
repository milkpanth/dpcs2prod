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
exports.SlidesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const auth_1 = require("../../shared/constants/auth");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const dto_1 = require("../../shared/decorators/response-template/dto");
const company_query_dto_1 = require("../../shared/dto/company-query.dto");
const dropdown_query_dto_1 = require("../../shared/dto/dropdown-query.dto");
const search_query_dto_1 = require("../../shared/dto/search-query.dto");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const storage_object_dto_1 = require("../images/dto/storage-object.dto");
const slidefile_entity_1 = require("../slidefiles/entities/slidefile.entity");
const tag_entity_1 = require("../tags/entities/tag.entity");
const dto_2 = require("./dto");
const create_slide_dto_1 = require("./dto/create-slide.dto");
const pagination_slide_dto_1 = require("./dto/pagination-slide.dto");
const qr_bim_dto_1 = require("./dto/qr-bim.dto");
const set_slide_previous_dto_1 = require("./dto/set-slide-previous.dto");
const update_slide_dto_1 = require("./dto/update-slide.dto");
const slide_entity_1 = require("./entities/slide.entity");
const slides_service_1 = require("./slides.service");
let SlidesController = class SlidesController {
    constructor(slidesService) {
        this.slidesService = slidesService;
    }
    create(createArraySlideDto) {
        return this.slidesService.create(createArraySlideDto);
    }
    generateBim(qrData) {
        return this.slidesService.createBimSlide(qrData);
    }
    async uploadFile(file) {
        return this.slidesService.upload(file);
    }
    async dropdown(user, query) {
        return this.slidesService.dropdown(user, query);
    }
    slideTags(query) {
        return this.slidesService.slideTags(query);
    }
    async slideThumbnail(id) {
        return this.slidesService.getSlideToThumbnailStatus(id);
    }
    async downloadFile(name) {
        return this.slidesService.downloadThumbnail(name);
    }
    findAll(graphUser, body) {
        return this.slidesService.findAll(graphUser, body);
    }
    async downloadPowerpoint(path) {
        return this.slidesService.downloadSlide(path);
    }
    findByName(searchDto) {
        return this.slidesService.findSlideByName(searchDto);
    }
    findById(slideIdDto) {
        return this.slidesService.findSlideById(slideIdDto);
    }
    update(updateArraySlideDto) {
        return this.slidesService.update(updateArraySlideDto);
    }
    remove(fileIds) {
        return this.slidesService.remove(fileIds);
    }
    setPreviousVersion(setSlidePreviousDto) {
        return this.slidesService.rollbackToPreviousVersion(setSlidePreviousDto);
    }
    downloadExcel(user, companyQuery, res) {
        const date = new Date();
        res.set({
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="${date.getTime()}.xlsx"`,
        });
        return this.slidesService.download(user, companyQuery, res);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "Create slides",
        description: "Create new slides",
    }),
    (0, response_template_1.ApiCreatedListTemplateResponse)({
        model: slide_entity_1.Slide,
        description: "Response created",
    }),
    (0, swagger_1.ApiBody)({ type: create_slide_dto_1.CreateSlideDto, isArray: true }),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: create_slide_dto_1.CreateSlideDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SlidesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("bim"),
    (0, swagger_1.ApiOperation)({
        summary: "Create bim slides",
        description: "Create new bim slides",
    }),
    (0, response_template_1.ApiCreatedTemplateResponse)({
        model: dto_2.CreateBimSlideResponseDto,
        description: "Response created",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qr_bim_dto_1.QrBimDto]),
    __metadata("design:returntype", void 0)
], SlidesController.prototype, "generateBim", null);
__decorate([
    (0, common_1.Post)("upload"),
    (0, swagger_1.ApiOperation)({
        summary: "Upload slide",
        description: "Upload slide",
    }),
    (0, response_template_1.ApiCreatedTemplateResponse)({
        model: dto_2.CreateBimSlideResponseDto,
        description: "Response uploaded",
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({ type: storage_object_dto_1.StorageObjectDto }),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 200 * 1000 * 1000 }),
            new common_1.FileTypeValidator({
                fileType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SlidesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)("dropdown"),
    (0, swagger_1.ApiOperation)({
        summary: "Get slides dropdown information",
        description: "Get list slide dropdown information",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: slide_entity_1.Slide,
        description: "Response get list slide dropdown information",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        dropdown_query_dto_1.DropdownDto]),
    __metadata("design:returntype", Promise)
], SlidesController.prototype, "dropdown", null);
__decorate([
    (0, common_1.Get)("tags"),
    (0, swagger_1.ApiOperation)({
        summary: "Get slides tags information",
        description: "Get list slide tags information",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: tag_entity_1.Tag,
        description: "Response get list slide tags information",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_query_dto_1.CompanyDto]),
    __metadata("design:returntype", void 0)
], SlidesController.prototype, "slideTags", null);
__decorate([
    (0, common_1.Get)("thumbnail/:id"),
    (0, swagger_1.ApiOperation)({
        summary: "Get slide thumbnail status by id",
        description: "Get slide thumbnail status by id",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "Response get slide thumbnail status by id",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SlidesController.prototype, "slideThumbnail", null);
__decorate([
    (0, common_1.Get)("thumbnail/download/:name"),
    (0, swagger_1.ApiOperation)({
        summary: "Download thumbnail",
        description: "Download thumbnail",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "Response downloaded",
    }),
    (0, common_1.SetMetadata)(auth_1.ALLOW_UNAUTHORIZED_KEY, true),
    __param(0, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SlidesController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.Post)("informations"),
    (0, swagger_1.ApiOperation)({
        summary: "Get slides information",
        description: "Get list slide information",
    }),
    (0, response_template_1.ApiPaginatedTemplateResponse)({
        model: slide_entity_1.Slide,
        description: "Response get list slide information",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        pagination_slide_dto_1.SlidePaginationDto]),
    __metadata("design:returntype", void 0)
], SlidesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("powerpoint/download/:path"),
    (0, swagger_1.ApiOperation)({
        summary: "Download slide",
        description: "Download slide",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "Response downloaded",
    }),
    (0, common_1.SetMetadata)(auth_1.ALLOW_UNAUTHORIZED_KEY, true),
    __param(0, (0, common_1.Param)("path")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SlidesController.prototype, "downloadPowerpoint", null);
__decorate([
    (0, common_1.Post)("findName"),
    (0, swagger_1.ApiOperation)({
        summary: "Get slides by payload",
        description: "Get list slide by payload",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: slide_entity_1.Slide,
        description: "Response get list slide by payload",
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_query_dto_1.SearchDto]),
    __metadata("design:returntype", void 0)
], SlidesController.prototype, "findByName", null);
__decorate([
    (0, common_1.Post)("findId"),
    (0, swagger_1.ApiOperation)({
        summary: "Get slides by ids",
        description: "Get list slide by ids",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: slide_entity_1.Slide,
        description: "Response get list slide by ids",
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: Number }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SlidesController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)("update"),
    (0, swagger_1.ApiOperation)({
        summary: "Update slides",
        description: "Update slides",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response updated",
    }),
    (0, swagger_1.ApiBody)({ type: update_slide_dto_1.UpdateSlideDto, isArray: true }),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: update_slide_dto_1.UpdateSlideDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SlidesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete slides",
        description: "Delete slides",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response deleted",
    }),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: (Array) }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SlidesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("rollbackToFirstVersion"),
    (0, response_template_1.ApiDefaultErrorsTemplateResponse)({
        disableBadRequest: true,
        disableForbidden: true,
        disableTooManyRequests: true,
        disableUnprocessable: true,
    }),
    (0, swagger_1.ApiOperation)({
        summary: "Rollback to previous version",
        description: "Rollback to previous version",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: slidefile_entity_1.SlideFile,
        description: "Response rollback to previous version",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_slide_previous_dto_1.SetSlidePreviousDto]),
    __metadata("design:returntype", void 0)
], SlidesController.prototype, "setPreviousVersion", null);
__decorate([
    (0, common_1.Get)("excel/download"),
    (0, swagger_1.ApiOperation)({
        summary: "Download slide for Excel file",
        description: "Download slide for Excel file",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "No content response",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        company_query_dto_1.CompanyDto, Object]),
    __metadata("design:returntype", void 0)
], SlidesController.prototype, "downloadExcel", null);
SlidesController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("Slide"),
    (0, common_1.Controller)("slides"),
    __metadata("design:paramtypes", [slides_service_1.SlidesService])
], SlidesController);
exports.SlidesController = SlidesController;
//# sourceMappingURL=slides.controller.js.map