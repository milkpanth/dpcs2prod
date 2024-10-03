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
exports.Tag = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_1 = require("../../../shared/entities/base");
const section_entity_1 = require("../../sections/entities/section.entity");
const slide_entity_1 = require("../../slides/entities/slide.entity");
let Tag = class Tag extends base_1.DataStateWithBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Tag.prototype, "TagID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "name",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "Name", length: 255, unique: true }),
    __metadata("design:type", String)
], Tag.prototype, "Name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "is series type",
        type: "boolean",
        example: true,
    }),
    (0, typeorm_1.Column)({ name: "IsSeriesType" }),
    __metadata("design:type", Boolean)
], Tag.prototype, "IsSeriesType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "slides",
        type: () => [slide_entity_1.Slide],
        examples: () => [slide_entity_1.Slide],
    }),
    (0, typeorm_1.ManyToMany)(() => slide_entity_1.Slide, (slide) => slide === null || slide === void 0 ? void 0 : slide.Tags),
    __metadata("design:type", Array)
], Tag.prototype, "Slides", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "sections",
        type: () => [section_entity_1.Section],
        examples: () => [section_entity_1.Section],
    }),
    (0, typeorm_1.ManyToMany)(() => section_entity_1.Section, (section) => section.Tags),
    __metadata("design:type", Array)
], Tag.prototype, "Sections", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "use count",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: "UseCount" }),
    __metadata("design:type", Number)
], Tag.prototype, "UseCount", void 0);
Tag = __decorate([
    (0, typeorm_1.Entity)("tags"),
    (0, typeorm_1.Unique)("Name", ["Name"])
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tag.entity.js.map