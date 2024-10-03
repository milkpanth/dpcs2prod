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
exports.EquipmentListsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const dto_1 = require("./dto");
const request_equipments_dto_1 = require("./dto/request-equipments.dto");
const equipmentlists_service_1 = require("./equipmentlists.service");
let EquipmentListsController = class EquipmentListsController {
    constructor(equipmentsService) {
        this.equipmentsService = equipmentsService;
    }
    update(graphUser, requestEquipmentLists) {
        return this.equipmentsService.getMatchResult(graphUser, requestEquipmentLists);
    }
};
__decorate([
    (0, common_1.Post)("match"),
    (0, swagger_1.ApiOperation)({
        summary: "Get matching equipments",
        description: "Get list matching equipment",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.GetEquipmentWithMatchResultResponseDto,
        description: "Response get list matching equipment",
    }),
    (0, swagger_1.ApiBody)({ type: request_equipments_dto_1.RequestEquipmentList, isArray: true }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: request_equipments_dto_1.RequestEquipmentList }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto, Array]),
    __metadata("design:returntype", void 0)
], EquipmentListsController.prototype, "update", null);
EquipmentListsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("EquipmentList"),
    (0, common_1.Controller)("equipmentlists"),
    __metadata("design:paramtypes", [equipmentlists_service_1.EquipmentListsService])
], EquipmentListsController);
exports.EquipmentListsController = EquipmentListsController;
//# sourceMappingURL=equipmentlists.controller.js.map