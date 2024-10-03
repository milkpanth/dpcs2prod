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
exports.SeriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_template_1 = require("../../shared/decorators/response-template");
const dto_1 = require("../../shared/decorators/response-template/dto");
const pagination_query_dto_1 = require("../../shared/dto/pagination-query.dto");
const search_query_dto_1 = require("../../shared/dto/search-query.dto");
const create_series_dto_1 = require("./dto/create-series.dto");
const export_modellink_dto_1 = require("./dto/export-modellink.dto");
const update_series_dto_1 = require("./dto/update-series.dto");
const series_entity_1 = require("./entities/series.entity");
const series_service_1 = require("./series.service");
let SeriesController = class SeriesController {
    constructor(seriesService) {
        this.seriesService = seriesService;
    }
    create(createArraySeriesDto) {
        return this.seriesService.create(createArraySeriesDto);
    }
    dropdown() {
        return this.seriesService.dropdown();
    }
    findAll(query) {
        return this.seriesService.findAll(query);
    }
    findByName(searchDto) {
        return this.seriesService.findSeriesByName(searchDto);
    }
    update(updateArraySeriesDto) {
        return this.seriesService.update(updateArraySeriesDto);
    }
    remove(names) {
        return this.seriesService.remove(names);
    }
    download(res) {
        const date = new Date();
        res.set({
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="${date.getTime()}.xlsx"`,
        });
        return this.seriesService.download(res);
    }
    modelLinkEditImage(exportModelLinkSeriesDto, res) {
        const date = new Date();
        res.set({
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="${date.getTime()}.xlsx"`,
        });
        return this.seriesService.exportModelLinkEditSeries(res, exportModelLinkSeriesDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "Create series",
        description: "Create series",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: series_entity_1.Series,
        description: "Response created",
    }),
    (0, swagger_1.ApiBody)({ type: create_series_dto_1.CreateSeriesDto, isArray: true }),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: create_series_dto_1.CreateSeriesDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SeriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("dropdown"),
    (0, swagger_1.ApiOperation)({
        summary: "Get dropdown series",
        description: "Get dropdown list series",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: series_entity_1.Series,
        description: "Response get dropdown list series",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeriesController.prototype, "dropdown", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get series",
        description: "Get list series",
    }),
    (0, response_template_1.ApiPaginatedTemplateResponse)({
        model: series_entity_1.Series,
        description: "Response get list series",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], SeriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("find"),
    (0, swagger_1.ApiOperation)({
        summary: "Get series by payload",
        description: "Get series by payload",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: series_entity_1.Series,
        description: "Response get series by payload",
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_query_dto_1.SearchDto]),
    __metadata("design:returntype", void 0)
], SeriesController.prototype, "findByName", null);
__decorate([
    (0, common_1.Patch)("update"),
    (0, swagger_1.ApiOperation)({
        summary: "Update series",
        description: "Update series",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response updated",
    }),
    (0, swagger_1.ApiBody)({ type: update_series_dto_1.UpdateSeriesDto, isArray: true }),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: update_series_dto_1.UpdateSeriesDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SeriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete series by ids",
        description: "Delete series by ids",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response deleted",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SeriesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("excel/download"),
    (0, swagger_1.ApiOperation)({
        summary: "Download series for Excel file",
        description: "Download series for Excel file",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "No content response",
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SeriesController.prototype, "download", null);
__decorate([
    (0, common_1.Post)("excel/modelLink/editSeries"),
    (0, swagger_1.ApiOperation)({
        summary: "Edit model link for Excel file",
        description: "Edit model link for Excel file",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "No content response",
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_modellink_dto_1.ExportModelLinkSeriesDto, Object]),
    __metadata("design:returntype", void 0)
], SeriesController.prototype, "modelLinkEditImage", null);
SeriesController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("Series"),
    (0, common_1.Controller)("series"),
    __metadata("design:paramtypes", [series_service_1.SeriesService])
], SeriesController);
exports.SeriesController = SeriesController;
//# sourceMappingURL=series.controller.js.map