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
exports.DeleteResultResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DeleteResultResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Raw SQL result returned by executed query",
        example: [],
    }),
    __metadata("design:type", Object)
], DeleteResultResponseDto.prototype, "raw", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: `* Number of affected rows/documents \n* Not all drivers support this`,
        example: 1,
    }),
    __metadata("design:type", Number)
], DeleteResultResponseDto.prototype, "affected", void 0);
exports.DeleteResultResponseDto = DeleteResultResponseDto;
//# sourceMappingURL=delete-result-template-response.dto.js.map