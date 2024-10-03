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
exports.UpdateModelDto = void 0;
const class_validator_1 = require("class-validator");
const create_model_dto_1 = require("./create-model.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdateModelDto extends create_model_dto_1.CreateModelDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((_, value) => ![undefined, null].includes(value)),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "NewName",
    }),
    __metadata("design:type", String)
], UpdateModelDto.prototype, "NewName", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        description: "IsEOL",
    }),
    __metadata("design:type", Boolean)
], UpdateModelDto.prototype, "IsEOL", void 0);
exports.UpdateModelDto = UpdateModelDto;
//# sourceMappingURL=update-model.dto.js.map