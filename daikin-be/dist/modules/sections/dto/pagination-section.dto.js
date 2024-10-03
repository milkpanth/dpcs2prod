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
exports.SectionPaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_query_company_1 = require("../../../shared/dto/pagination-query-company");
class SectionPaginationDto extends pagination_query_company_1.PaginationWithCompanyDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "SameName",
        type: `boolean`,
        example: "true",
    }),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SectionPaginationDto.prototype, "SameName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "tagIDs",
        type: Number,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SectionPaginationDto.prototype, "tagIDs", void 0);
exports.SectionPaginationDto = SectionPaginationDto;
//# sourceMappingURL=pagination-section.dto.js.map