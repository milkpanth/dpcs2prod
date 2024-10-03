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
exports.PermissionAction = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const UserTypeEnum_enum_1 = require("../../../shared/enum/UserTypeEnum.enum");
const user_entity_1 = require("../../users/entities/user.entity");
let PermissionAction = class PermissionAction {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], PermissionAction.prototype, "ActionID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "role",
        type: "enum",
        enum: UserTypeEnum_enum_1.UserTypeEnum,
        example: UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN,
    }),
    (0, typeorm_1.Column)({ type: "enum", enum: UserTypeEnum_enum_1.UserTypeEnum }),
    __metadata("design:type", String)
], PermissionAction.prototype, "Role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "permission",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PermissionAction.prototype, "Permission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "read",
        type: "boolean",
        example: true,
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], PermissionAction.prototype, "Read", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "modify",
        type: "boolean",
        example: true,
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], PermissionAction.prototype, "Modify", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "delete",
        type: "boolean",
        example: true,
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], PermissionAction.prototype, "Delete", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User",
        type: () => user_entity_1.User,
        example: () => user_entity_1.User,
    }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: "Role", referencedColumnName: "Type" }),
    __metadata("design:type", user_entity_1.User)
], PermissionAction.prototype, "User", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Users",
        type: () => [user_entity_1.User],
        examples: () => [user_entity_1.User],
    }),
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.PermissionAction),
    __metadata("design:type", Array)
], PermissionAction.prototype, "Users", void 0);
PermissionAction = __decorate([
    (0, typeorm_1.Entity)("permission_actions")
], PermissionAction);
exports.PermissionAction = PermissionAction;
//# sourceMappingURL=permission_action.entity.js.map