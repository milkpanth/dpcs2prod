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
exports.Model = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_1 = require("../../../shared/entities/base");
const image_entity_1 = require("../../images/entities/image.entity");
const series_entity_1 = require("../../series/entities/series.entity");
let Model = class Model extends base_1.DataStateWithBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.PrimaryColumn)({ name: "Name", length: 20 }),
    __metadata("design:type", String)
], Model.prototype, "Name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "series name",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ name: "SeriesName", length: 20 }),
    __metadata("design:type", String)
], Model.prototype, "SeriesName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "image id",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Model.prototype, "ImageID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "series",
        type: () => series_entity_1.Series,
        example: () => series_entity_1.Series,
    }),
    (0, typeorm_1.ManyToOne)(() => series_entity_1.Series, (s) => s.Models),
    (0, typeorm_1.JoinColumn)({ name: "SeriesName" }),
    __metadata("design:type", series_entity_1.Series)
], Model.prototype, "Series", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "image",
        type: () => image_entity_1.Image,
        example: () => image_entity_1.Image,
    }),
    (0, typeorm_1.OneToOne)(() => image_entity_1.Image),
    (0, typeorm_1.JoinColumn)({ name: "ImageID" }),
    __metadata("design:type", image_entity_1.Image)
], Model.prototype, "Image", void 0);
Model = __decorate([
    (0, typeorm_1.Entity)("models")
], Model);
exports.Model = Model;
//# sourceMappingURL=model.entity.js.map