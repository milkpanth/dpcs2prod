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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const dto_1 = require("../../shared/decorators/response-template/dto");
const company_query_dto_1 = require("../../shared/dto/company-query.dto");
const pagination_query_company_1 = require("../../shared/dto/pagination-query-company");
const search_query_dto_1 = require("../../shared/dto/search-query.dto");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const categories_service_1 = require("./categories.service");
const dto_2 = require("./dto");
const create_category_dto_1 = require("./dto/create-category.dto");
const dropdown_query_dto_1 = require("./dto/dropdown-query.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const category_entity_1 = require("./entities/category.entity");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    create(user, createArrayCategoryDto) {
        return this.categoriesService.create(user, createArrayCategoryDto);
    }
    findAll(user, query) {
        return this.categoriesService.findAll(user, query);
    }
    async dropdown(user, query) {
        return this.categoriesService.dropdown(user, query);
    }
    findById(id) {
        return this.categoriesService.findById(id);
    }
    findByName(user, searchDto) {
        return this.categoriesService.findCategoryByName(user, searchDto);
    }
    update(user, updateArrayCategoryDto) {
        return this.categoriesService.update(user, updateArrayCategoryDto);
    }
    remove(user, ids) {
        return this.categoriesService.remove(user, ids);
    }
    download(user, companyQuery, res) {
        const date = new Date();
        res.set({
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="${date.getTime()}.xlsx"`,
        });
        return this.categoriesService.download(user, companyQuery, res);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "Create categories",
        description: "Create new categories",
    }),
    (0, response_template_1.ApiCreatedListTemplateResponse)({
        model: dto_2.CreateCategoryResponseDto,
        description: "Response created",
    }),
    (0, swagger_1.ApiBody)({ type: create_category_dto_1.CreateCategoryDto, isArray: true }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: create_category_dto_1.CreateCategoryDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto, Array]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get categories information",
        description: "Get list category information",
    }),
    (0, response_template_1.ApiPaginatedTemplateResponse)({
        model: category_entity_1.Category,
        description: "Response get list category information",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        pagination_query_company_1.PaginationWithCompanyDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("dropdown"),
    (0, swagger_1.ApiOperation)({
        summary: "Get categories dropdown information",
        description: "Get list category dropdown information",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: category_entity_1.Category,
        description: "Response get list category dropdown information",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        dropdown_query_dto_1.DropdownCategoriesDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "dropdown", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Get category by id",
        description: "Get category by id",
    }),
    (0, response_template_1.ApiPaginatedTemplateResponse)({
        model: category_entity_1.Category,
        description: "Response get category by id",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)("find"),
    (0, common_1.Get)("dropdown"),
    (0, swagger_1.ApiOperation)({
        summary: "Get categories by payload",
        description: "Get list category by payload",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: category_entity_1.Category,
        description: "Response get list category by payload",
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        search_query_dto_1.SearchDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findByName", null);
__decorate([
    (0, common_1.Patch)("update"),
    (0, swagger_1.ApiOperation)({
        summary: "Update categories",
        description: "Update categories",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response updated",
    }),
    (0, swagger_1.ApiBody)({ type: update_category_dto_1.UpdateCategoryDto, isArray: true }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: update_category_dto_1.UpdateCategoryDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto, Array]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete categories by ids",
        description: "Delete categories by ids",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response deleted",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: (Array) }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto, Array]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("excel/download"),
    (0, swagger_1.ApiOperation)({
        summary: "Download category for Excel file",
        description: "Download category for Excel file",
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
], CategoriesController.prototype, "download", null);
CategoriesController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("Category"),
    (0, common_1.Controller)("categories"),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map