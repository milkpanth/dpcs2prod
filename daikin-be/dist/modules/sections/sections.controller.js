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
exports.SectionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const dto_1 = require("../../shared/decorators/response-template/dto");
const company_query_dto_1 = require("../../shared/dto/company-query.dto");
const dropdown_query_dto_1 = require("../../shared/dto/dropdown-query.dto");
const search_query_dto_1 = require("../../shared/dto/search-query.dto");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const tag_entity_1 = require("../tags/entities/tag.entity");
const create_section_dto_1 = require("./dto/create-section.dto");
const pagination_section_dto_1 = require("./dto/pagination-section.dto");
const update_section_dto_1 = require("./dto/update-section.dto");
const section_entity_1 = require("./entities/section.entity");
const sections_service_1 = require("./sections.service");
let SectionsController = class SectionsController {
    constructor(sectionsService) {
        this.sectionsService = sectionsService;
    }
    create(user, createArraySectionDto) {
        return this.sectionsService.create(user, createArraySectionDto);
    }
    findAll(user, body) {
        return this.sectionsService.findAll(user, body);
    }
    dropdown(user, query) {
        return this.sectionsService.dropdown(user, query);
    }
    sectionTags(query) {
        return this.sectionsService.sectionTags(query);
    }
    findById(id) {
        return this.sectionsService.findById(id);
    }
    findByName(user, searchDto) {
        return this.sectionsService.findSectionByName(user, searchDto);
    }
    update(user, updateArraySectionDto) {
        return this.sectionsService.update(user, updateArraySectionDto);
    }
    remove(user, ids) {
        return this.sectionsService.remove(user, ids);
    }
    download(user, companyQuery, res) {
        const date = new Date();
        res.set({
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="${date.getTime()}.xlsx"`,
        });
        return this.sectionsService.download(user, companyQuery, res);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "Create sections",
        description: "Create sections",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: section_entity_1.Section,
        description: "Response created",
    }),
    (0, swagger_1.ApiBody)({ type: create_section_dto_1.CreateSectionDto, isArray: true }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: create_section_dto_1.CreateSectionDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto, Array]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("informations"),
    (0, swagger_1.ApiOperation)({
        summary: "Get sections",
        description: "Get list section",
    }),
    (0, response_template_1.ApiPaginatedTemplateResponse)({
        model: section_entity_1.Section,
        description: "Response get list section",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        pagination_section_dto_1.SectionPaginationDto]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("dropdown"),
    (0, swagger_1.ApiOperation)({
        summary: "Get dropdown sections",
        description: "Get dropdown list section",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: section_entity_1.Section,
        description: "Response get dropdown list section",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto, dropdown_query_dto_1.DropdownDto]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "dropdown", null);
__decorate([
    (0, common_1.Get)("tags"),
    (0, swagger_1.ApiOperation)({
        summary: "Get section tags",
        description: "Get list section tags",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: tag_entity_1.Tag,
        description: "Response get list section tags",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_query_dto_1.CompanyDto]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "sectionTags", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Get section by id",
        description: "Get section by id",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: tag_entity_1.Tag,
        description: "Response get section by id",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)("find"),
    (0, swagger_1.ApiOperation)({
        summary: "Get section by payload",
        description: "Get section by payload",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: section_entity_1.Section,
        description: "Response get section by payload",
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        search_query_dto_1.SearchDto]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "findByName", null);
__decorate([
    (0, common_1.Patch)("update"),
    (0, swagger_1.ApiOperation)({
        summary: "Update sections",
        description: "Update sections",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response updated",
    }),
    (0, swagger_1.ApiBody)({ type: update_section_dto_1.UpdateSectionDto, isArray: true }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: update_section_dto_1.UpdateSectionDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto, Array]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete section by ids",
        description: "Delete section by ids",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response deleted",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto, Array]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("excel/download"),
    (0, swagger_1.ApiOperation)({
        summary: "Download section for Excel file",
        description: "Download section for Excel file",
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
], SectionsController.prototype, "download", null);
SectionsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("Section"),
    (0, common_1.Controller)("sections"),
    __metadata("design:paramtypes", [sections_service_1.SectionsService])
], SectionsController);
exports.SectionsController = SectionsController;
//# sourceMappingURL=sections.controller.js.map