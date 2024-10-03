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
exports.BookmarksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const bookmarks_service_1 = require("./bookmarks.service");
const bookmark_entity_1 = require("./entities/bookmark.entity");
let BookmarksController = class BookmarksController {
    constructor(bookmarksService) {
        this.bookmarksService = bookmarksService;
    }
    toggle(graphUser, fileId) {
        return this.bookmarksService.toggle(graphUser, fileId);
    }
    async findAll(graphUser) {
        return this.bookmarksService.findAll(graphUser);
    }
};
__decorate([
    (0, common_1.Post)("/:fileId"),
    (0, swagger_1.ApiOperation)({
        summary: "Create new user is not existing / Delete user existing",
        description: "Create new user is not existing / Delete user existing",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: bookmark_entity_1.Bookmark,
        description: "Response created with user is not existing / deleted user existing",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Param)("fileId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto, Number]),
    __metadata("design:returntype", void 0)
], BookmarksController.prototype, "toggle", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get bookmarks information",
        description: "Get list bookmark information",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: bookmark_entity_1.Bookmark,
        description: "Response get list bookmark information",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto]),
    __metadata("design:returntype", Promise)
], BookmarksController.prototype, "findAll", null);
BookmarksController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("Bookmark"),
    (0, common_1.Controller)("bookmarks"),
    __metadata("design:paramtypes", [bookmarks_service_1.BookmarksService])
], BookmarksController);
exports.BookmarksController = BookmarksController;
//# sourceMappingURL=bookmarks.controller.js.map