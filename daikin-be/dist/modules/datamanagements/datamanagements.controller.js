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
exports.DataManagementsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const datamanagements_service_1 = require("./datamanagements.service");
const dto_1 = require("./dto");
const list_release_to_live_response_dto_1 = require("./dto/list-release-to-live-response.dto");
const schedule_release_dto_1 = require("./dto/schedule-release.dto");
let DataManagementsController = class DataManagementsController {
    constructor(dataManagementsService) {
        this.dataManagementsService = dataManagementsService;
    }
    async listReleaseToLive(queryPayload) {
        return this.dataManagementsService.listRelease(queryPayload);
    }
    async exportExcelList(res, queryPayload) {
        const date = new Date();
        res.set({
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="Releases-${date.getTime()}.xlsx"`,
        });
        return this.dataManagementsService.exportExcelList(res, queryPayload);
    }
    async doReleaseToLive(user, queryPayload) {
        return this.dataManagementsService.doRelease(user, queryPayload);
    }
    async scheduleRelease(user, scheduleReleaseDto, queryPayload) {
        const { date } = scheduleReleaseDto;
        return this.dataManagementsService.doScheduleRelease(user, queryPayload);
    }
};
__decorate([
    (0, common_1.Get)("listrelease"),
    (0, swagger_1.ApiOperation)({
        summary: "Get list release to live",
        description: "Get list release to live",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: list_release_to_live_response_dto_1.ListReleaseToLiveResponseDto,
        description: "Response get list release to live",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ListReleaseToLiveDto]),
    __metadata("design:returntype", Promise)
], DataManagementsController.prototype, "listReleaseToLive", null);
__decorate([
    (0, common_1.Get)("download"),
    (0, swagger_1.ApiOperation)({
        summary: "Download data management for Excel file",
        description: "Download data management for Excel file",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "No content response",
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.ListReleaseToLiveDto]),
    __metadata("design:returntype", Promise)
], DataManagementsController.prototype, "exportExcelList", null);
__decorate([
    (0, common_1.Post)("dorelease"),
    (0, swagger_1.ApiOperation)({
        summary: "Do release",
        description: "Do release",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "No content response",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        dto_1.ListReleaseToLiveDto]),
    __metadata("design:returntype", Promise)
], DataManagementsController.prototype, "doReleaseToLive", null);
__decorate([
    (0, common_1.Post)("scheduleRelease"),
    (0, swagger_1.ApiOperation)({
        summary: "Do schedule release",
        description: "Do schedule release",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "No content response",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        schedule_release_dto_1.ScheduleReleaseDto,
        dto_1.ListReleaseToLiveDto]),
    __metadata("design:returntype", Promise)
], DataManagementsController.prototype, "scheduleRelease", null);
DataManagementsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("DataManagement"),
    (0, common_1.Controller)("datamanagements"),
    __metadata("design:paramtypes", [datamanagements_service_1.DataManagementsService])
], DataManagementsController);
exports.DataManagementsController = DataManagementsController;
//# sourceMappingURL=datamanagements.controller.js.map