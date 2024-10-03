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
exports.Slide = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_1 = require("../../../shared/entities/base");
const company_entity_1 = require("../../companies/entities/company.entity");
const section_entity_1 = require("../../sections/entities/section.entity");
const slidefile_entity_1 = require("../../slidefiles/entities/slidefile.entity");
const slidefiles_archive_entity_1 = require("../../slidefiles/entities/slidefiles_archive.entity");
const tag_entity_1 = require("../../tags/entities/tag.entity");
let Slide = class Slide extends base_1.DataStateWithBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Slide.prototype, "SlideID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "file name",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "FileName" }),
    __metadata("design:type", String)
], Slide.prototype, "FileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "display name",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "DisplayName" }),
    __metadata("design:type", String)
], Slide.prototype, "DisplayName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "company code",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "CompanyCode" }),
    __metadata("design:type", String)
], Slide.prototype, "CompanyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "section id",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: "SectionID" }),
    __metadata("design:type", Number)
], Slide.prototype, "SectionID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "section",
        type: () => section_entity_1.Section,
        example: () => section_entity_1.Section,
    }),
    (0, typeorm_1.ManyToOne)(() => section_entity_1.Section, (section) => section.Slides),
    (0, typeorm_1.JoinColumn)({ name: "SectionID" }),
    __metadata("design:type", section_entity_1.Section)
], Slide.prototype, "Section", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "slide file",
        type: () => [slidefile_entity_1.SlideFile],
        examples: () => [slidefile_entity_1.SlideFile],
    }),
    (0, typeorm_1.OneToMany)(() => slidefile_entity_1.SlideFile, (file) => file.Slide),
    (0, typeorm_1.JoinColumn)({
        name: "SlideID",
    }),
    __metadata("design:type", Array)
], Slide.prototype, "SlideFiles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "slide file archives",
        type: () => [slidefiles_archive_entity_1.SlideFileArchive],
        examples: () => [slidefiles_archive_entity_1.SlideFileArchive],
    }),
    (0, typeorm_1.OneToMany)(() => slidefiles_archive_entity_1.SlideFileArchive, (file) => file.Slide),
    (0, typeorm_1.JoinColumn)({
        name: "SlideID",
    }),
    __metadata("design:type", Array)
], Slide.prototype, "SlideFileArchives", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "tags",
        type: () => [tag_entity_1.Tag],
        examples: () => [tag_entity_1.Tag],
    }),
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.Tag, (tag) => tag === null || tag === void 0 ? void 0 : tag.Slides),
    (0, typeorm_1.JoinTable)({
        name: "slidetags",
        joinColumn: { name: "SlideID" },
        inverseJoinColumn: { name: "TagID" },
    }),
    __metadata("design:type", Array)
], Slide.prototype, "Tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "company",
        type: () => company_entity_1.Company,
        example: () => company_entity_1.Company,
    }),
    (0, typeorm_1.OneToOne)(() => company_entity_1.Company),
    (0, typeorm_1.JoinColumn)({ name: "CompanyCode" }),
    __metadata("design:type", company_entity_1.Company)
], Slide.prototype, "Company", void 0);
Slide = __decorate([
    (0, typeorm_1.Entity)("slides")
], Slide);
exports.Slide = Slide;
//# sourceMappingURL=slide.entity.js.map