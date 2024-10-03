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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const dto_1 = require("../../shared/decorators/response-template/dto");
const pagination_query_company_1 = require("../../shared/dto/pagination-query-company");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const dto_2 = require("./dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_entity_1 = require("./entities/user.entity");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll(user, query) {
        return this.usersService.findAll(user, query);
    }
    async self(user) {
        return this.usersService.self(user);
    }
    async datatype() {
        return this.usersService.getAllDataType();
    }
    update(uuid, updateUserDto) {
        return this.usersService.update(uuid, updateUserDto);
    }
    remove(uuid) {
        return this.usersService.remove(uuid);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get users information",
        description: "Get list user information",
    }),
    (0, response_template_1.ApiPaginatedTemplateResponse)({
        model: user_entity_1.User,
        description: "Response get list user information",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        pagination_query_company_1.PaginationWithCompanyDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("self"),
    (0, swagger_1.ApiOperation)({
        summary: "Get users self information",
        description: "Get list user self information",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: user_entity_1.User,
        description: "Response get users self information",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "self", null);
__decorate([
    (0, common_1.Get)("datatype"),
    (0, swagger_1.ApiOperation)({
        summary: "Get user data type information",
        description: "Get user data type information",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_2.getAllDataTypeResponseDto,
        description: "Response get user data type information",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "datatype", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Update user by id",
        description: "Update user by id",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response updated",
    }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete user by id",
        description: "Delete user by id",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.UpdateResultResponseDto,
        description: "Response deleted",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("User"),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map