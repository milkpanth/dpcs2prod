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
exports.ListReleaseToLiveResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const category_entity_1 = require("../../../modules/categories/entities/category.entity");
const company_entity_1 = require("../../../modules/companies/entities/company.entity");
const image_entity_1 = require("../../../modules/images/entities/image.entity");
const model_entity_1 = require("../../../modules/models/entities/model.entity");
const section_entity_1 = require("../../../modules/sections/entities/section.entity");
const series_entity_1 = require("../../../modules/series/entities/series.entity");
const slide_entity_1 = require("../../../modules/slides/entities/slide.entity");
const tag_entity_1 = require("../../../modules/tags/entities/tag.entity");
class ListReleaseToLiveResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "series",
        type: [series_entity_1.Series],
    }),
    __metadata("design:type", Array)
], ListReleaseToLiveResponseDto.prototype, "series", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "model",
        type: [model_entity_1.Model],
    }),
    __metadata("design:type", Array)
], ListReleaseToLiveResponseDto.prototype, "models", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "categories",
        type: [category_entity_1.Category],
    }),
    __metadata("design:type", Array)
], ListReleaseToLiveResponseDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "sections",
        type: [section_entity_1.Section],
    }),
    __metadata("design:type", Array)
], ListReleaseToLiveResponseDto.prototype, "sections", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "slides",
        type: [slide_entity_1.Slide],
    }),
    __metadata("design:type", Array)
], ListReleaseToLiveResponseDto.prototype, "slides", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "tags",
        type: [tag_entity_1.Tag],
    }),
    __metadata("design:type", Array)
], ListReleaseToLiveResponseDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "images",
        type: [image_entity_1.Image],
    }),
    __metadata("design:type", Array)
], ListReleaseToLiveResponseDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "companies",
        type: [company_entity_1.Company],
    }),
    __metadata("design:type", Array)
], ListReleaseToLiveResponseDto.prototype, "companies", void 0);
exports.ListReleaseToLiveResponseDto = ListReleaseToLiveResponseDto;
//# sourceMappingURL=list-release-to-live-response.dto.js.map