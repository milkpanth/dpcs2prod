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
exports.DataStateWithBaseEntity = exports.BaseEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const DataStateEnum_1 = require("../enum/DataStateEnum");
class BaseEntity {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "created by",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BaseEntity.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "update by",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BaseEntity.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "the time that create",
        type: "date",
        example: new Date(),
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BaseEntity.prototype, "CreatedDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "the latest time that update",
        type: "date",
        example: new Date(),
    }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BaseEntity.prototype, "UpdatedDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "the time that delete",
        type: "date",
        example: new Date(),
    }),
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "DeletedDate", void 0);
exports.BaseEntity = BaseEntity;
class DataStateWithBaseEntity extends BaseEntity {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "use database",
        type: DataStateEnum_1.Use,
        enum: DataStateEnum_1.Use,
    }),
    (0, typeorm_1.Column)({ name: "Use", type: "enum", enum: DataStateEnum_1.Use }),
    __metadata("design:type", String)
], DataStateWithBaseEntity.prototype, "Use", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "live database",
        type: DataStateEnum_1.Live,
        enum: DataStateEnum_1.Live,
    }),
    (0, typeorm_1.Column)({ name: "Live", type: "enum", enum: DataStateEnum_1.Live }),
    __metadata("design:type", String)
], DataStateWithBaseEntity.prototype, "Live", void 0);
exports.DataStateWithBaseEntity = DataStateWithBaseEntity;
//# sourceMappingURL=base.js.map