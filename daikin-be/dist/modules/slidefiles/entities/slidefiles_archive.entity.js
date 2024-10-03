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
exports.SlideFileArchive = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const like_entity_1 = require("../../likes/entities/like.entity");
const slide_entity_1 = require("../../slides/entities/slide.entity");
let SlideFileArchive = class SlideFileArchive {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], SlideFileArchive.prototype, "FileID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Slide id",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: "SlideID" }),
    __metadata("design:type", Number)
], SlideFileArchive.prototype, "SlideID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "language",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "Language" }),
    __metadata("design:type", String)
], SlideFileArchive.prototype, "Language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "path",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "Path" }),
    __metadata("design:type", String)
], SlideFileArchive.prototype, "Path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "version",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: "Version" }),
    __metadata("design:type", Number)
], SlideFileArchive.prototype, "Version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "slide total page",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: "SlideTotalPage" }),
    __metadata("design:type", Number)
], SlideFileArchive.prototype, "SlideTotalPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Slide",
        type: () => slide_entity_1.Slide,
        examples: () => slide_entity_1.Slide,
    }),
    (0, typeorm_1.ManyToOne)(() => slide_entity_1.Slide, (slide) => slide.SlideFiles),
    (0, typeorm_1.JoinColumn)({
        name: "SlideID",
    }),
    __metadata("design:type", slide_entity_1.Slide)
], SlideFileArchive.prototype, "Slide", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Like",
        type: () => [like_entity_1.Like],
        examples: () => [like_entity_1.Like],
    }),
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, (like) => like.SlideFile),
    __metadata("design:type", Array)
], SlideFileArchive.prototype, "Likes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "created by",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SlideFileArchive.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "the time that create",
        type: "date",
        example: new Date(),
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SlideFileArchive.prototype, "CreatedDate", void 0);
SlideFileArchive = __decorate([
    (0, typeorm_1.Entity)("slidefiles_archive")
], SlideFileArchive);
exports.SlideFileArchive = SlideFileArchive;
//# sourceMappingURL=slidefiles_archive.entity.js.map