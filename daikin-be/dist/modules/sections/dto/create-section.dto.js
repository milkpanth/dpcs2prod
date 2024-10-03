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
exports.CreateSectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSectionDto {
    constructor() {
        this.CompanyCode = null;
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "Name",
    }),
    __metadata("design:type", String)
], CreateSectionDto.prototype, "Name", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        description: "AlwaysDisplay",
    }),
    __metadata("design:type", Boolean)
], CreateSectionDto.prototype, "AlwaysDisplay", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        description: "SameName",
    }),
    __metadata("design:type", Boolean)
], CreateSectionDto.prototype, "SameName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((_, value) => ![undefined, null].includes(value)),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "CompanyCode",
    }),
    __metadata("design:type", String)
], CreateSectionDto.prototype, "CompanyCode", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: (Array),
        description: "Tag",
    }),
    __metadata("design:type", Array)
], CreateSectionDto.prototype, "SelectedTag", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((_, value) => ![undefined, null].includes(value)),
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: "Category",
    }),
    __metadata("design:type", Number)
], CreateSectionDto.prototype, "CategoryID", void 0);
exports.CreateSectionDto = CreateSectionDto;
//# sourceMappingURL=create-section.dto.js.map