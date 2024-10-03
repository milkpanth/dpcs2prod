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
exports.TableDashboardQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class TableDashboardQueryDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Limit",
        type: Number,
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], TableDashboardQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Page",
        type: Number,
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], TableDashboardQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Name",
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TableDashboardQueryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Order",
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TableDashboardQueryDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Direction",
        enum: ["ASC", "DESC"],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TableDashboardQueryDto.prototype, "direction", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Company",
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TableDashboardQueryDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Type",
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TableDashboardQueryDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Start",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], TableDashboardQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "End",
        type: Date,
        required: true,
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], TableDashboardQueryDto.prototype, "endDate", void 0);
exports.TableDashboardQueryDto = TableDashboardQueryDto;
//# sourceMappingURL=table-dashboard-query.dto.js.map