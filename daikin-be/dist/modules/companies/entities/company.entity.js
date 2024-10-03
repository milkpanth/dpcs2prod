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
exports.Company = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_1 = require("../../../shared/entities/base");
let Company = class Company extends base_1.BaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.PrimaryColumn)({ type: "varchar" }),
    __metadata("design:type", String)
], Company.prototype, "CompanyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "name",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "text", unique: true }),
    __metadata("design:type", String)
], Company.prototype, "Name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "prefix",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Company.prototype, "Prefix", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "abbreviation",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "Abbreviation", void 0);
Company = __decorate([
    (0, typeorm_1.Entity)("companies")
], Company);
exports.Company = Company;
//# sourceMappingURL=company.entity.js.map