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
exports.ValidateModelResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const series_entity_1 = require("../../../modules/series/entities/series.entity");
const model_entity_1 = require("../entities/model.entity");
class ValidateModelResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => model_entity_1.Model,
        description: "match model",
        example: () => model_entity_1.Model,
    }),
    __metadata("design:type", model_entity_1.Model)
], ValidateModelResponseDto.prototype, "matchModel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => series_entity_1.Series,
        description: "match series",
        example: () => series_entity_1.Series,
    }),
    __metadata("design:type", series_entity_1.Series)
], ValidateModelResponseDto.prototype, "matchSeries", void 0);
exports.ValidateModelResponseDto = ValidateModelResponseDto;
//# sourceMappingURL=validate-model-response.dto.js.map