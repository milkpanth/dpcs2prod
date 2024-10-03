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
exports.PendingUsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const dto_1 = require("../../shared/decorators/response-template/dto");
const pagination_query_dto_1 = require("../../shared/dto/pagination-query.dto");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const create_pendinguser_dto_1 = require("./dto/create-pendinguser.dto");
const update_pendinguser_dto_1 = require("./dto/update-pendinguser.dto");
const pendinguser_entity_1 = require("./entities/pendinguser.entity");
const pendingusers_service_1 = require("./pendingusers.service");
let PendingUsersController = class PendingUsersController {
    constructor(pendingUsersService) {
        this.pendingUsersService = pendingUsersService;
    }
    create(user, createPendingUserDto) {
        return this.pendingUsersService.create(user, createPendingUserDto);
    }
    async findAll(query) {
        return this.pendingUsersService.findAll(query);
    }
    update(user, id, updatePendingUserDto) {
        return this.pendingUsersService.update(user, id, updatePendingUserDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "Create pending user",
        description: "Create pending user",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: pendinguser_entity_1.PendingUser,
        description: "Response created",
    }),
    (0, swagger_1.ApiBody)({ type: create_pendinguser_dto_1.CreatePendingUserDto }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        create_pendinguser_dto_1.CreatePendingUserDto]),
    __metadata("design:returntype", void 0)
], PendingUsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get pending users",
        description: "Get list pending user",
    }),
    (0, response_template_1.ApiPaginatedTemplateResponse)({
        model: pendinguser_entity_1.PendingUser,
        description: "Response get list pending user",
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], PendingUsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Update pending users by id",
        description: "Update pending user by id",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response updated",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto, Number, update_pendinguser_dto_1.UpdatePendingUserDto]),
    __metadata("design:returntype", void 0)
], PendingUsersController.prototype, "update", null);
PendingUsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("PendingUser"),
    (0, common_1.Controller)("pendingusers"),
    __metadata("design:paramtypes", [pendingusers_service_1.PendingUsersService])
], PendingUsersController);
exports.PendingUsersController = PendingUsersController;
//# sourceMappingURL=pendingusers.controller.js.map