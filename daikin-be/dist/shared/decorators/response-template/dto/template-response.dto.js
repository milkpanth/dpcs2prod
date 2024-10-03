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
exports.ResponseTemplateDto = exports.ResponseStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ResponseStatusDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Status code",
        required: true,
        type: String,
        default: "S0200",
    }),
    __metadata("design:type", String)
], ResponseStatusDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Status message",
        required: true,
        type: String,
        default: "Success",
    }),
    __metadata("design:type", String)
], ResponseStatusDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Meta is an optional field for display an error data",
    }),
    __metadata("design:type", Object)
], ResponseStatusDto.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Stacktrace ia anoptional field for display error stacktrace",
    }),
    __metadata("design:type", Object)
], ResponseStatusDto.prototype, "stack", void 0);
exports.ResponseStatusDto = ResponseStatusDto;
class ResponseTemplateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "response status",
        required: true,
        type: ResponseStatusDto,
    }),
    __metadata("design:type", ResponseStatusDto)
], ResponseTemplateDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Response data" }),
    __metadata("design:type", Object)
], ResponseTemplateDto.prototype, "data", void 0);
exports.ResponseTemplateDto = ResponseTemplateDto;
//# sourceMappingURL=template-response.dto.js.map