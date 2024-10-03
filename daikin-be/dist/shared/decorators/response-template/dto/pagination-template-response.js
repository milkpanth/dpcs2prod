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
exports.PaginationResponseDto = exports.PaginationMetaDto = exports.PaginationRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PaginationRequest {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page number if you use offset value dont input this field',
        required: false,
        default: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PaginationRequest.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Limit of result number',
        default: 20,
        maximum: 100,
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PaginationRequest.prototype, "limit", void 0);
exports.PaginationRequest = PaginationRequest;
class PaginationMetaDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'total number of items',
        example: 60,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'number of item in response',
        example: 20,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "itemCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'items per page (limit)',
        example: 20,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "itemsPerPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'total page',
        example: 3,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'current page',
        example: 1,
    }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "currentPage", void 0);
exports.PaginationMetaDto = PaginationMetaDto;
class PaginationResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Result of items' }),
    __metadata("design:type", Array)
], PaginationResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Meta data of pagination', type: PaginationMetaDto }),
    __metadata("design:type", PaginationMetaDto)
], PaginationResponseDto.prototype, "meta", void 0);
exports.PaginationResponseDto = PaginationResponseDto;
//# sourceMappingURL=pagination-template-response.js.map