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
exports.CreateSlideDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSlideDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "FileName",
    }),
    __metadata("design:type", String)
], CreateSlideDto.prototype, "FileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "DisplayName",
    }),
    __metadata("design:type", String)
], CreateSlideDto.prototype, "DisplayName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "Language",
    }),
    __metadata("design:type", String)
], CreateSlideDto.prototype, "Language", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: "SectionID",
    }),
    __metadata("design:type", Number)
], CreateSlideDto.prototype, "SectionID", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: (Array),
        description: "Tag",
    }),
    __metadata("design:type", Array)
], CreateSlideDto.prototype, "SelectedSlideTag", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((_, value) => ![undefined, null].includes(value)),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "CompanyCode",
    }),
    __metadata("design:type", String)
], CreateSlideDto.prototype, "CompanyCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "Path",
    }),
    __metadata("design:type", String)
], CreateSlideDto.prototype, "Path", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: "SlideTotalPage",
    }),
    __metadata("design:type", Number)
], CreateSlideDto.prototype, "SlideTotalPage", void 0);
exports.CreateSlideDto = CreateSlideDto;
//# sourceMappingURL=create-slide.dto.js.map