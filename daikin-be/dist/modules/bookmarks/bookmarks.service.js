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
exports.BookmarksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bookmark_entity_1 = require("./entities/bookmark.entity");
const db_1 = require("../../shared/constants/db");
const typeorm_2 = require("@nestjs/typeorm");
let BookmarksService = class BookmarksService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async toggle(graphUser, fileId) {
        return await this.dataSource.transaction(async (manager) => {
            const isBookmarkExist = await manager.existsBy(bookmark_entity_1.Bookmark, {
                UserMemberID: graphUser.oid,
                FileID: fileId,
            });
            return isBookmarkExist
                ? await manager.delete(bookmark_entity_1.Bookmark, {
                    UserMemberID: graphUser.oid,
                    FileID: fileId,
                })
                : await manager.save(bookmark_entity_1.Bookmark, {
                    UserMemberID: graphUser.oid,
                    FileID: fileId,
                });
        });
    }
    async findAll(graphUser) {
        return await this.dataSource.getRepository(bookmark_entity_1.Bookmark).findBy({
            UserMemberID: graphUser.oid,
        });
    }
};
BookmarksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)(db_1.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], BookmarksService);
exports.BookmarksService = BookmarksService;
//# sourceMappingURL=bookmarks.service.js.map