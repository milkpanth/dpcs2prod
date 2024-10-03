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
exports.TagsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_template_1 = require("../../shared/decorators/response-template");
const dto_1 = require("../../shared/decorators/response-template/dto");
const pagination_query_dto_1 = require("../../shared/dto/pagination-query.dto");
const search_query_dto_1 = require("../../shared/dto/search-query.dto");
const create_tag_dto_1 = require("./dto/create-tag.dto");
const update_tag_dto_1 = require("./dto/update-tag.dto");
const tag_entity_1 = require("./entities/tag.entity");
const tags_service_1 = require("./tags.service");
let TagsController = class TagsController {
    constructor(tagsService) {
        this.tagsService = tagsService;
    }
    create(createArrayTagDto) {
        return this.tagsService.create(createArrayTagDto);
    }
    findAll(query) {
        return this.tagsService.findAll(query);
    }
    async dropdown(query) {
        return this.tagsService.dropdown(query.IsSeriesType == "true");
    }
    findById(id) {
        return this.tagsService.findById(id);
    }
    findByName(searchDto) {
        return this.tagsService.findTagByName(searchDto);
    }
    update(updateArrayTagDto) {
        return this.tagsService.update(updateArrayTagDto);
    }
    remove(ids) {
        return this.tagsService.remove(ids);
    }
    download(res) {
        const date = new Date();
        res.set({
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="${date.getTime()}.xlsx"`,
        });
        return this.tagsService.download(res);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "Create tags",
        description: "Create tags",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.InsertResultResponseDto,
        description: "Response created",
    }),
    (0, swagger_1.ApiBody)({ type: create_tag_dto_1.CreateTagDto, isArray: true }),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: create_tag_dto_1.CreateTagDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get tags information",
        description: "Get list tag information",
    }),
    (0, response_template_1.ApiPaginatedTemplateResponse)({
        model: tag_entity_1.Tag,
        description: "Response get list tag information",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("dropdown"),
    (0, swagger_1.ApiOperation)({
        summary: "Get dropdown tags information",
        description: "Get list tags dropdown information",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: tag_entity_1.Tag,
        description: "Response get list tag information",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "dropdown", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Get dropdown tag by id",
        description: "Get tags by id",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: tag_entity_1.Tag,
        description: "Response get tag by id",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)("find"),
    (0, swagger_1.ApiOperation)({
        summary: "Get dropdown tag by payload",
        description: "Get tags by payload",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: tag_entity_1.Tag,
        description: "Response get tag by payload",
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_query_dto_1.SearchDto]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "findByName", null);
__decorate([
    (0, common_1.Patch)("update"),
    (0, swagger_1.ApiOperation)({
        summary: "Update tags",
        description: "Update tags",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response updated",
    }),
    (0, swagger_1.ApiBody)({ type: update_tag_dto_1.UpdateTagDto, isArray: true }),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: update_tag_dto_1.UpdateTagDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete tags",
        description: "Delete tag by ids",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response deleted",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("excel/download"),
    (0, swagger_1.ApiOperation)({
        summary: "Download tag for Excel file",
        description: "Download tag for Excel file",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "No content response",
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "download", null);
TagsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("Tag"),
    (0, common_1.Controller)("tags"),
    __metadata("design:paramtypes", [tags_service_1.TagsService])
], TagsController);
exports.TagsController = TagsController;
//# sourceMappingURL=tags.controller.js.map