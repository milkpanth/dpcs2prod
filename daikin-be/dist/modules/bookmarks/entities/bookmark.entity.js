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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookmark = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const slidefile_entity_1 = require("../../slidefiles/entities/slidefile.entity");
let Bookmark = class Bookmark {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Bookmark.prototype, "ID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "user member id",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "UserMemberID", length: 255 }),
    __metadata("design:type", String)
], Bookmark.prototype, "UserMemberID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "file id",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: "FileID" }),
    __metadata("design:type", Number)
], Bookmark.prototype, "FileID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "slide file",
        type: () => slidefile_entity_1.SlideFile,
        example: () => slidefile_entity_1.SlideFile,
    }),
    (0, typeorm_1.ManyToOne)(() => slidefile_entity_1.SlideFile, (file) => file.Likes),
    (0, typeorm_1.JoinColumn)({
        name: "FileID",
    }),
    __metadata("design:type", slidefile_entity_1.SlideFile)
], Bookmark.prototype, "SlideFile", void 0);
Bookmark = __decorate([
    (0, typeorm_1.Entity)("bookmarks")
], Bookmark);
exports.Bookmark = Bookmark;
//# sourceMappingURL=bookmark.entity.js.map