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
exports.CompaniesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const dto_1 = require("../../shared/decorators/response-template/dto");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const companies_service_1 = require("./companies.service");
const update_company_dto_1 = require("./dto/update-company.dto");
const company_entity_1 = require("./entities/company.entity");
let CompaniesController = class CompaniesController {
    constructor(companiesService) {
        this.companiesService = companiesService;
    }
    async dropdown(graphUser) {
        return this.companiesService.dropdown(graphUser);
    }
    update(code, updateCompanyDto) {
        return this.companiesService.update(code, updateCompanyDto);
    }
    remove(code) {
        return this.companiesService.remove(code);
    }
};
__decorate([
    (0, common_1.Get)("dropdown"),
    (0, swagger_1.ApiOperation)({
        summary: "Get companies dropdown information",
        description: "Get list company dropdown information",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: company_entity_1.Company,
        description: "Response get list company dropdown information",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto]),
    __metadata("design:returntype", Promise)
], CompaniesController.prototype, "dropdown", null);
__decorate([
    (0, common_1.Patch)(":code"),
    (0, swagger_1.ApiOperation)({
        summary: "Update companies",
        description: "Update companies",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response updated",
    }),
    __param(0, (0, common_1.Param)("code")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_company_dto_1.UpdateCompanyDto]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":code"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete company by company code",
        description: "Delete company by company code",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.DeleteResultResponseDto,
        description: "Response deleted",
    }),
    __param(0, (0, common_1.Param)("code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "remove", null);
CompaniesController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("Company"),
    (0, common_1.Controller)("companies"),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService])
], CompaniesController);
exports.CompaniesController = CompaniesController;
//# sourceMappingURL=companies.controller.js.map