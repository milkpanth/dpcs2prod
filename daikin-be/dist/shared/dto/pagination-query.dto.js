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
exports.PaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const DataStateEnum_1 = require("../enum/DataStateEnum");
class PaginationDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Limit",
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Page",
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Keyword",
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "keyword", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Order",
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Direction",
        enum: ["ASC", "DESC"],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "direction", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Live",
        type: Boolean,
    }),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], PaginationDto.prototype, "live", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        isArray: true,
        enum: DataStateEnum_1.Live,
        description: "liveStatus",
    }),
    __metadata("design:type", Array)
], PaginationDto.prototype, "liveStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        isArray: true,
        enum: DataStateEnum_1.Use,
        name: "useStatus",
    }),
    __metadata("design:type", Array)
], PaginationDto.prototype, "useStatus", void 0);
exports.PaginationDto = PaginationDto;
//# sourceMappingURL=pagination-query.dto.js.map