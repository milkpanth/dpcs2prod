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
exports.Series = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_1 = require("../../../shared/entities/base");
const model_entity_1 = require("../../models/entities/model.entity");
const tag_entity_1 = require("../../tags/entities/tag.entity");
let Series = class Series extends base_1.DataStateWithBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.PrimaryColumn)({ name: "Name", length: 20, unique: true }),
    __metadata("design:type", String)
], Series.prototype, "Name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "series type",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Series.prototype, "SeriesType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "model",
        type: () => [model_entity_1.Model],
        examples: () => [model_entity_1.Model],
    }),
    (0, typeorm_1.OneToMany)(() => model_entity_1.Model, (m) => m.Series),
    __metadata("design:type", Array)
], Series.prototype, "Models", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "tag",
        type: () => tag_entity_1.Tag,
        examples: () => [tag_entity_1.Tag],
    }),
    (0, typeorm_1.OneToOne)(() => tag_entity_1.Tag),
    (0, typeorm_1.JoinColumn)({ name: "SeriesType" }),
    __metadata("design:type", tag_entity_1.Tag)
], Series.prototype, "Tag", void 0);
Series = __decorate([
    (0, typeorm_1.Entity)("series")
], Series);
exports.Series = Series;
//# sourceMappingURL=series.entity.js.map