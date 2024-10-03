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
exports.Section = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_1 = require("../../../shared/entities/base");
const category_entity_1 = require("../../categories/entities/category.entity");
const slidefile_entity_1 = require("../../slidefiles/entities/slidefile.entity");
const slide_entity_1 = require("../../slides/entities/slide.entity");
const tag_entity_1 = require("../../tags/entities/tag.entity");
let Section = class Section extends base_1.DataStateWithBaseEntity {
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "primary key",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Section.prototype, "SectionID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "name",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "Name", length: 255, unique: true }),
    __metadata("design:type", String)
], Section.prototype, "Name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "always display",
        type: "boolean",
        example: true,
    }),
    (0, typeorm_1.Column)({ name: "AlwaysDisplay" }),
    __metadata("design:type", Boolean)
], Section.prototype, "AlwaysDisplay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "same name",
        type: "boolean",
        example: true,
    }),
    (0, typeorm_1.Column)({ name: "SameName" }),
    __metadata("design:type", Boolean)
], Section.prototype, "SameName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "company code",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "CompanyCode" }),
    __metadata("design:type", String)
], Section.prototype, "CompanyCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "company code",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: "CategoryID" }),
    __metadata("design:type", Number)
], Section.prototype, "CategoryID", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "category",
        type: () => category_entity_1.Category,
        example: () => category_entity_1.Category,
    }),
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.Sections, {
        onDelete: "SET NULL",
    }),
    (0, typeorm_1.JoinColumn)({ name: "CategoryID" }),
    __metadata("design:type", category_entity_1.Category)
], Section.prototype, "Category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "slides",
        type: () => [slide_entity_1.Slide],
        examples: () => [slide_entity_1.Slide],
    }),
    (0, typeorm_1.OneToMany)(() => slide_entity_1.Slide, (slide) => slide.Section),
    (0, typeorm_1.JoinColumn)({ name: "SectionID" }),
    __metadata("design:type", Array)
], Section.prototype, "Slides", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "tags",
        type: () => [tag_entity_1.Tag],
        examples: () => [tag_entity_1.Tag],
    }),
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.Tag, (tag) => tag.Sections),
    (0, typeorm_1.JoinTable)({
        name: "sectiontags",
        joinColumn: { name: "SectionID" },
        inverseJoinColumn: { name: "TagID" },
    }),
    __metadata("design:type", Array)
], Section.prototype, "Tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "slide files",
        type: () => [slidefile_entity_1.SlideFile],
        examples: () => [slidefile_entity_1.SlideFile],
    }),
    (0, typeorm_1.OneToMany)(() => slidefile_entity_1.SlideFile, (file) => file.Slide),
    (0, typeorm_1.JoinTable)({
        name: "Slides",
        joinColumn: { name: "SlideID" },
    }),
    __metadata("design:type", Array)
], Section.prototype, "SlideFiles", void 0);
Section = __decorate([
    (0, typeorm_1.Entity)("sections")
], Section);
exports.Section = Section;
//# sourceMappingURL=section.entity.js.map