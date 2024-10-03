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
exports.Image = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_1 = require("../../../shared/entities/base");
const model_entity_1 = require("../../models/entities/model.entity");
let Image = class Image extends base_1.DataStateWithBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Image.prototype, "ImageID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "name",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "Name", length: 255, unique: true }),
    __metadata("design:type", String)
], Image.prototype, "Name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "file",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "File", type: "text", nullable: true }),
    __metadata("design:type", String)
], Image.prototype, "File", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "models",
        type: () => [model_entity_1.Model],
        examples: () => [model_entity_1.Model],
    }),
    (0, typeorm_1.OneToMany)(() => model_entity_1.Model, (i) => i.Image),
    (0, typeorm_1.JoinColumn)({ name: "ImageID" }),
    __metadata("design:type", Array)
], Image.prototype, "Models", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "use count",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: "UseCount" }),
    __metadata("design:type", Number)
], Image.prototype, "UseCount", void 0);
Image = __decorate([
    (0, typeorm_1.Entity)("images")
], Image);
exports.Image = Image;
//# sourceMappingURL=image.entity.js.map