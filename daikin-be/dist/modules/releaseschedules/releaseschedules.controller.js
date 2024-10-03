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
exports.ReleaseScheduleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const dto_1 = require("../../shared/decorators/response-template/dto");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const dto_2 = require("../datamanagements/dto");
const create_releaseschedule_dto_1 = require("./dto/create-releaseschedule.dto");
const releaseschedule_entity_1 = require("./entities/releaseschedule.entity");
const releaseschedules_service_1 = require("./releaseschedules.service");
let ReleaseScheduleController = class ReleaseScheduleController {
    constructor(releaseSchedulesService) {
        this.releaseSchedulesService = releaseSchedulesService;
    }
    create(user, createReleaseScheduleDto, queryPayload) {
        return this.releaseSchedulesService.create(user, createReleaseScheduleDto, queryPayload);
    }
    list() {
        return this.releaseSchedulesService.list();
    }
    remove(id) {
        return this.releaseSchedulesService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "create new release schedule",
        description: "create new release schedule",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: releaseschedule_entity_1.ReleaseSchedule,
        description: "Response created",
    }),
    (0, swagger_1.ApiBody)({ type: create_releaseschedule_dto_1.CreateReleaseScheduleDto }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        create_releaseschedule_dto_1.CreateReleaseScheduleDto,
        dto_2.ListReleaseToLiveDto]),
    __metadata("design:returntype", void 0)
], ReleaseScheduleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get release schedules information",
        description: "Get list release schedule information",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: releaseschedule_entity_1.ReleaseSchedule,
        description: "Response get list release schedule information",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReleaseScheduleController.prototype, "list", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete release schedule by id",
        description: "Delete release schedule by id",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.DeleteResultResponseDto,
        description: "Response deleted",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReleaseScheduleController.prototype, "remove", null);
ReleaseScheduleController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("ReleaseSchedules"),
    (0, common_1.Controller)("releaseschedules"),
    __metadata("design:paramtypes", [releaseschedules_service_1.ReleaseScheduleService])
], ReleaseScheduleController);
exports.ReleaseScheduleController = ReleaseScheduleController;
//# sourceMappingURL=releaseschedules.controller.js.map