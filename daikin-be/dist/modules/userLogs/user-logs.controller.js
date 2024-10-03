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
exports.UserLogsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const dto_1 = require("./dto");
const user_logs_entity_1 = require("./entities/user-logs.entity");
const user_logs_service_1 = require("./user-logs.service");
let UserLogsController = class UserLogsController {
    constructor(userLogsService) {
        this.userLogsService = userLogsService;
    }
    create(request, user, createUserLogList) {
        return this.userLogsService.createBulk(request, user, createUserLogList);
    }
};
__decorate([
    (0, common_1.Post)("/bulk"),
    (0, swagger_1.ApiOperation)({
        summary: "Create User Logs",
        description: "Create new User Logs",
    }),
    (0, response_template_1.ApiCreatedListTemplateResponse)({
        model: user_logs_entity_1.UserLogs,
        description: "Response created",
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateUserLogsDto, isArray: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, auth_decorator_1.AuthDecorator)()),
    __param(2, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: dto_1.CreateUserLogsDto }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, graph_user_dto_1.GraphUserDto, Array]),
    __metadata("design:returntype", void 0)
], UserLogsController.prototype, "create", null);
UserLogsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("User Logs"),
    (0, common_1.Controller)("user-logs"),
    __metadata("design:paramtypes", [user_logs_service_1.UserLogsService])
], UserLogsController);
exports.UserLogsController = UserLogsController;
//# sourceMappingURL=user-logs.controller.js.map