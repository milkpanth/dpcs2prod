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
exports.ModelsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_template_1 = require("../../shared/decorators/response-template");
const dto_1 = require("../../shared/decorators/response-template/dto");
const pagination_query_dto_1 = require("../../shared/dto/pagination-query.dto");
const search_query_dto_1 = require("../../shared/dto/search-query.dto");
const dto_2 = require("./dto");
const create_model_dto_1 = require("./dto/create-model.dto");
const update_model_dto_1 = require("./dto/update-model.dto");
const validate_model_dto_1 = require("./dto/validate-model.dto");
const model_entity_1 = require("./entities/model.entity");
const models_service_1 = require("./models.service");
let ModelsController = class ModelsController {
    constructor(modelsService) {
        this.modelsService = modelsService;
    }
    create(createArrayModelDto) {
        return this.modelsService.create(createArrayModelDto);
    }
    async dropdown() {
        return this.modelsService.dropdown();
    }
    findAll(query) {
        return this.modelsService.findAll(query);
    }
    findByName(searchDto) {
        return this.modelsService.findModelsByName(searchDto);
    }
    validateModel(validateDto) {
        return this.modelsService.validateModel(validateDto);
    }
    update(updateArrayModelDto) {
        return this.modelsService.update(updateArrayModelDto);
    }
    remove(names) {
        return this.modelsService.remove(names);
    }
    download(res) {
        const date = new Date();
        res.set({
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="${date.getTime()}.xlsx"`,
        });
        return this.modelsService.download(res);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "Create model",
        description: "Create model",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: model_entity_1.Model,
        description: "Response created",
    }),
    (0, swagger_1.ApiBody)({ type: create_model_dto_1.CreateModelDto, isArray: true }),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: create_model_dto_1.CreateModelDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ModelsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("dropdown"),
    (0, swagger_1.ApiOperation)({
        summary: "Get dropdown models",
        description: "Get list dropdown models",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: model_entity_1.Model,
        description: "Response get list dropdown models",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModelsController.prototype, "dropdown", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get models",
        description: "Get list model",
    }),
    (0, response_template_1.ApiPaginatedTemplateResponse)({
        model: model_entity_1.Model,
        description: "Response get list model",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ModelsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("find"),
    (0, swagger_1.ApiOperation)({
        summary: "Get models by payload",
        description: "Get list model by payload",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: model_entity_1.Model,
        description: "Response get list model by payload",
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_query_dto_1.SearchDto]),
    __metadata("design:returntype", void 0)
], ModelsController.prototype, "findByName", null);
__decorate([
    (0, common_1.Post)("validate"),
    (0, swagger_1.ApiOperation)({
        summary: "Validate model",
        description: "Validate model",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_2.ValidateModelResponseDto,
        description: "Response validate model",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_model_dto_1.ValidateModelDto]),
    __metadata("design:returntype", void 0)
], ModelsController.prototype, "validateModel", null);
__decorate([
    (0, common_1.Patch)("update"),
    (0, swagger_1.ApiOperation)({
        summary: "Update models",
        description: "Update models",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response updated",
    }),
    (0, swagger_1.ApiBody)({ type: update_model_dto_1.UpdateModelDto, isArray: true }),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: update_model_dto_1.UpdateModelDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ModelsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete models",
        description: "Delete models",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response deleted",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ModelsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("excel/download"),
    (0, swagger_1.ApiOperation)({
        summary: "Download model",
        description: "Download model",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "No content response",
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ModelsController.prototype, "download", null);
ModelsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("Model"),
    (0, common_1.Controller)("models"),
    __metadata("design:paramtypes", [models_service_1.ModelsService])
], ModelsController);
exports.ModelsController = ModelsController;
//# sourceMappingURL=models.controller.js.map