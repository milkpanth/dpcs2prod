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
exports.CreateCategoryResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const DataStateEnum_1 = require("../../../shared/enum/DataStateEnum");
class CreateCategoryResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "category id",
        example: 1,
    }),
    __metadata("design:type", Number)
], CreateCategoryResponseDto.prototype, "CategoryID", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "company code",
        example: "test",
    }),
    __metadata("design:type", String)
], CreateCategoryResponseDto.prototype, "CompanyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "name",
        example: "test",
    }),
    __metadata("design:type", String)
], CreateCategoryResponseDto.prototype, "Name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "same name",
        example: "test",
    }),
    __metadata("design:type", Boolean)
], CreateCategoryResponseDto.prototype, "SameName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "always display",
        example: true,
    }),
    __metadata("design:type", Boolean)
], CreateCategoryResponseDto.prototype, "AlwaysDisplay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "use status",
        example: DataStateEnum_1.Use.New,
    }),
    __metadata("design:type", String)
], CreateCategoryResponseDto.prototype, "Use", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "use status",
        example: DataStateEnum_1.Live.New,
    }),
    __metadata("design:type", String)
], CreateCategoryResponseDto.prototype, "Live", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "created by",
        example: "test",
    }),
    __metadata("design:type", String)
], CreateCategoryResponseDto.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "updated by",
        example: "test",
    }),
    __metadata("design:type", String)
], CreateCategoryResponseDto.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "the time that create",
        example: new Date(),
    }),
    __metadata("design:type", Date)
], CreateCategoryResponseDto.prototype, "DeletedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "the time that create",
        example: new Date(),
    }),
    __metadata("design:type", Date)
], CreateCategoryResponseDto.prototype, "CreatedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "the time that update",
        example: new Date(),
    }),
    __metadata("design:type", Date)
], CreateCategoryResponseDto.prototype, "UpdatedDate", void 0);
exports.CreateCategoryResponseDto = CreateCategoryResponseDto;
//# sourceMappingURL=create-category-response.dto.js.map