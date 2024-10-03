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
exports.ValidateModelDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ValidateModelDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((_, value) => ![undefined, null].includes(value)),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "ModelName",
    }),
    __metadata("design:type", String)
], ValidateModelDto.prototype, "ModelName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((_, value) => ![undefined, null].includes(value)),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "SeriesName",
    }),
    __metadata("design:type", String)
], ValidateModelDto.prototype, "SeriesName", void 0);
exports.ValidateModelDto = ValidateModelDto;
//# sourceMappingURL=validate-model.dto.js.map