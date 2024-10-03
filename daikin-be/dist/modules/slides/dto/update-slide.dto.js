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
exports.UpdateSlideDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_slide_dto_1 = require("./create-slide.dto");
class UpdateSlideDto extends create_slide_dto_1.CreateSlideDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: "SlideID",
    }),
    __metadata("design:type", Number)
], UpdateSlideDto.prototype, "SlideID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((_, value) => ![undefined, null].includes(value)),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "NewFileName",
    }),
    __metadata("design:type", String)
], UpdateSlideDto.prototype, "NewFileName", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        description: "IsEOL",
    }),
    __metadata("design:type", Boolean)
], UpdateSlideDto.prototype, "IsEOL", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: (Array),
        description: "DeletedSlideFiles",
    }),
    __metadata("design:type", Array)
], UpdateSlideDto.prototype, "DeletedSlideFiles", void 0);
exports.UpdateSlideDto = UpdateSlideDto;
//# sourceMappingURL=update-slide.dto.js.map