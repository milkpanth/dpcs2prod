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
exports.PermissionActionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_template_1 = require("../../shared/decorators/response-template");
const dto_1 = require("../../shared/decorators/response-template/dto");
const update_permissionactions_dto_1 = require("./dto/update-permissionactions.dto");
const permission_action_entity_1 = require("./entities/permission_action.entity");
const permissionactions_service_1 = require("./permissionactions.service");
let PermissionActionsController = class PermissionActionsController {
    constructor(permissionactionsService) {
        this.permissionactionsService = permissionactionsService;
    }
    findAll() {
        return this.permissionactionsService.findAll();
    }
    update(updateArrayPermissionDto) {
        return this.permissionactionsService.update(updateArrayPermissionDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get permissionactions",
        description: "Get list permissionactions information",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: permission_action_entity_1.PermissionAction,
        description: "Response get list permissionactions information",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PermissionActionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({
        summary: "Update permissionactions",
        description: "Update permissionactions",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response updated",
    }),
    (0, swagger_1.ApiBody)({ type: update_permissionactions_dto_1.UpdatePermissionDto, isArray: true }),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: update_permissionactions_dto_1.UpdatePermissionDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PermissionActionsController.prototype, "update", null);
PermissionActionsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("PermissionAction"),
    (0, common_1.Controller)("permissionactions"),
    __metadata("design:paramtypes", [permissionactions_service_1.PermissionActionsService])
], PermissionActionsController);
exports.PermissionActionsController = PermissionActionsController;
//# sourceMappingURL=permissionactions.controller.js.map