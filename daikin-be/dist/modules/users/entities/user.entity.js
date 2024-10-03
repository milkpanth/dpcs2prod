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
exports.User = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const UserTypeEnum_enum_1 = require("../../../shared/enum/UserTypeEnum.enum");
const company_entity_1 = require("../../companies/entities/company.entity");
const permission_action_entity_1 = require("../../permissionactions/entities/permission_action.entity");
let User = class User {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "string",
        format: "uuid",
        example: "test",
    }),
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "UserMemberID", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "company code",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "CompanyCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "position",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "Position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "country",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "char", length: 2, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "Country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "user member name",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "UserMemberName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "user member surname",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "UserMemberSurname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "user member email",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], User.prototype, "UserMemberEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "user member phone",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "UserMemberPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "user member status",
        type: "boolean",
        example: true,
    }),
    (0, typeorm_1.Column)({ type: "boolean" }),
    __metadata("design:type", Boolean)
], User.prototype, "UserMemberStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "user type",
        type: "enum",
        enum: UserTypeEnum_enum_1.UserTypeEnum,
        example: UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN,
    }),
    (0, typeorm_1.Column)({ type: "enum", enum: UserTypeEnum_enum_1.UserTypeEnum }),
    __metadata("design:type", String)
], User.prototype, "Type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "recent login",
        type: "date",
        example: new Date(),
    }),
    (0, typeorm_1.Column)({ type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "RecentLogin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "created by",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "CreatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "the time that create",
        type: "date",
        example: new Date(),
    }),
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], User.prototype, "CreatedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "updated by",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "UpdatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "the time that update",
        type: "datetime",
        example: new Date(),
    }),
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], User.prototype, "UpdatedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "the time that delete",
        type: "datetime",
        example: new Date(),
    }),
    (0, typeorm_1.DeleteDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], User.prototype, "DeletedDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "user Permission action",
        type: () => [permission_action_entity_1.PermissionAction],
        examples: () => [permission_action_entity_1.PermissionAction],
    }),
    (0, typeorm_1.OneToMany)(() => permission_action_entity_1.PermissionAction, (permission) => permission.User),
    __metadata("design:type", Array)
], User.prototype, "PermissionActions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "reverse-side of permission User",
        type: () => permission_action_entity_1.PermissionAction,
        example: () => permission_action_entity_1.PermissionAction,
    }),
    (0, typeorm_1.ManyToOne)(() => permission_action_entity_1.PermissionAction),
    (0, typeorm_1.JoinColumn)({ name: "Type", referencedColumnName: "Role" }),
    __metadata("design:type", permission_action_entity_1.PermissionAction)
], User.prototype, "PermissionAction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "reverse-side of permission User",
        type: () => company_entity_1.Company,
        example: () => company_entity_1.Company,
    }),
    (0, typeorm_1.OneToOne)(() => company_entity_1.Company),
    (0, typeorm_1.JoinColumn)({ name: "CompanyCode" }),
    __metadata("design:type", company_entity_1.Company)
], User.prototype, "Company", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("users")
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map