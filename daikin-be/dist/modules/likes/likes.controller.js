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
exports.LikesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const dto_1 = require("./dto");
const like_entity_1 = require("./entities/like.entity");
const likes_service_1 = require("./likes.service");
let LikesController = class LikesController {
    constructor(likesService) {
        this.likesService = likesService;
    }
    toggle(graphUser, fileId) {
        return this.likesService.toggle(graphUser, fileId);
    }
    async findAll(graphUser) {
        return this.likesService.findAll(graphUser);
    }
};
__decorate([
    (0, common_1.Post)("/:fileId"),
    (0, swagger_1.ApiOperation)({
        summary: "Delete or Create like",
        description: "Delete or Create like",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.LikeToggleResponseDto,
        description: "Response Delete/Create like",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Param)("fileId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto, Number]),
    __metadata("design:returntype", void 0)
], LikesController.prototype, "toggle", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get likes",
        description: "Get list like",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: like_entity_1.Like,
        description: "Response list like",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto]),
    __metadata("design:returntype", Promise)
], LikesController.prototype, "findAll", null);
LikesController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("Like"),
    (0, common_1.Controller)("likes"),
    __metadata("design:paramtypes", [likes_service_1.LikesService])
], LikesController);
exports.LikesController = LikesController;
//# sourceMappingURL=likes.controller.js.map