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
exports.PendingUser = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const UserTypeEnum_enum_1 = require("../../../shared/enum/UserTypeEnum.enum");
let PendingUser = class PendingUser {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], PendingUser.prototype, "ID", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "company code",
        type: "string",
        nullable: true,
        maxLength: 50,
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], PendingUser.prototype, "CompanyCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "position",
        type: "string",
        nullable: true,
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], PendingUser.prototype, "Position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "country",
        type: "string",
        maxLength: 2,
        nullable: true,
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "char", length: 2, nullable: true }),
    __metadata("design:type", String)
], PendingUser.prototype, "Country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "user member name",
        type: "string",
        nullable: true,
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], PendingUser.prototype, "UserMemberName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "user member surname",
        type: "string",
        nullable: true,
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], PendingUser.prototype, "UserMemberSurname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "user member email",
        type: "email",
        nullable: true,
        example: "test@email.com",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], PendingUser.prototype, "UserMemberEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "user member phone",
        type: "string",
        maxLength: 255,
        nullable: true,
        example: "0999999999",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], PendingUser.prototype, "UserMemberPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "type",
        type: "enum",
        enum: UserTypeEnum_enum_1.UserTypeEnum,
        example: UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN,
    }),
    (0, typeorm_1.Column)({ type: "enum", enum: UserTypeEnum_enum_1.UserTypeEnum }),
    __metadata("design:type", String)
], PendingUser.prototype, "Type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "approve status",
        type: "boolean",
        maxLength: 255,
        nullable: true,
        example: true,
    }),
    (0, typeorm_1.Column)({ type: "boolean" }),
    __metadata("design:type", Boolean)
], PendingUser.prototype, "ApproveStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "created by",
        type: "string",
        maxLength: 255,
        nullable: true,
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], PendingUser.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "the time that create",
        type: "date",
        example: new Date(),
    }),
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], PendingUser.prototype, "CreatedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "update by",
        type: "string",
        maxLength: 255,
        nullable: true,
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], PendingUser.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "the latest time that update",
        type: "date",
        example: new Date(),
    }),
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], PendingUser.prototype, "UpdatedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "the time that delete",
        type: "date",
        example: new Date(),
    }),
    (0, typeorm_1.DeleteDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], PendingUser.prototype, "DeletedDate", void 0);
PendingUser = __decorate([
    (0, typeorm_1.Entity)("pendingusers")
], PendingUser);
exports.PendingUser = PendingUser;
//# sourceMappingURL=pendinguser.entity.js.map