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
exports.UserLogs = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let UserLogs = class UserLogs {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "integer",
        description: "primary key",
        example: 1,
        maxLength: 11,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserLogs.prototype, "ID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "user member id",
        maxLength: 50,
        example: "040b5c96-60c1-411a-aac9-ccd041bb2e4a",
    }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], UserLogs.prototype, "UserMemberID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "ip address",
        maxLength: 255,
        example: "127.0.0.1",
    }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], UserLogs.prototype, "IPAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "function",
        maxLength: 255,
        example: "Function name",
    }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], UserLogs.prototype, "Function", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "detailed description",
        maxLength: 255,
        example: "Add detail function",
    }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], UserLogs.prototype, "Detail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: "date",
        description: "the time that create",
        example: new Date(),
    }),
    (0, typeorm_1.CreateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], UserLogs.prototype, "CreatedDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: "datetime",
        description: "the time that update",
        example: new Date(),
    }),
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime" }),
    __metadata("design:type", Date)
], UserLogs.prototype, "UpdatedDate", void 0);
UserLogs = __decorate([
    (0, typeorm_1.Entity)("userlogs")
], UserLogs);
exports.UserLogs = UserLogs;
//# sourceMappingURL=user-logs.entity.js.map