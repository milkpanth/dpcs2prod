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
exports.Category = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_1 = require("../../../shared/entities/base");
const section_entity_1 = require("../../sections/entities/section.entity");
let Category = class Category extends base_1.DataStateWithBaseEntity {
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "primary key",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Category.prototype, "CategoryID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "name",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "Name", length: 255, unique: true }),
    __metadata("design:type", String)
], Category.prototype, "Name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "same name",
        type: "boolean",
        example: true,
    }),
    (0, typeorm_1.Column)({ name: "SameName" }),
    __metadata("design:type", Boolean)
], Category.prototype, "SameName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "always display",
        type: "boolean",
        example: true,
    }),
    (0, typeorm_1.Column)({ name: "AlwaysDisplay" }),
    __metadata("design:type", Boolean)
], Category.prototype, "AlwaysDisplay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "company code",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "CompanyCode" }),
    __metadata("design:type", String)
], Category.prototype, "CompanyCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "sections",
        type: () => [section_entity_1.Section],
        examples: () => [section_entity_1.Section],
    }),
    (0, typeorm_1.OneToMany)(() => section_entity_1.Section, (section) => section.Category, {
        onDelete: "SET NULL",
    }),
    (0, typeorm_1.JoinColumn)({ name: "CategoryID" }),
    __metadata("design:type", Array)
], Category.prototype, "Sections", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "sections id",
        type: () => [section_entity_1.Section],
        examples: () => [section_entity_1.Section],
    }),
    (0, typeorm_1.OneToMany)(() => section_entity_1.Section, (Section) => Section.Category),
    (0, typeorm_1.JoinColumn)({
        name: "CategoryID",
    }),
    __metadata("design:type", Array)
], Category.prototype, "SectionsID", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)("categories")
], Category);
exports.Category = Category;
//# sourceMappingURL=category.entity.js.map