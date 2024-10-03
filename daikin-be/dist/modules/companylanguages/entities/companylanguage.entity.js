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
exports.CompanyLanguage = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let CompanyLanguage = class CompanyLanguage {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], CompanyLanguage.prototype, "ID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "company code",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], CompanyLanguage.prototype, "CompanyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "language",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], CompanyLanguage.prototype, "Language", void 0);
CompanyLanguage = __decorate([
    (0, typeorm_1.Entity)("companylanguages"),
    (0, typeorm_1.Unique)("companylanguages_unique", ["CompanyCode", "Language"])
], CompanyLanguage);
exports.CompanyLanguage = CompanyLanguage;
//# sourceMappingURL=companylanguage.entity.js.map