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
exports.CreatePendingUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const UserTypeEnum_enum_1 = require("../../../shared/enum/UserTypeEnum.enum");
class CreatePendingUserDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((_, value) => ![undefined, null].includes(value)),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "CompanyCode",
    }),
    __metadata("design:type", String)
], CreatePendingUserDto.prototype, "CompanyCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "Position",
    }),
    __metadata("design:type", String)
], CreatePendingUserDto.prototype, "Position", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "Country",
    }),
    __metadata("design:type", String)
], CreatePendingUserDto.prototype, "Country", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(() => UserTypeEnum_enum_1.UserTypeEnum),
    (0, swagger_1.ApiPropertyOptional)({
        enum: UserTypeEnum_enum_1.UserTypeEnum,
        description: "Type",
    }),
    __metadata("design:type", String)
], CreatePendingUserDto.prototype, "Type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "UserMemberName",
    }),
    __metadata("design:type", String)
], CreatePendingUserDto.prototype, "UserMemberName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "UserMemberSurname",
    }),
    __metadata("design:type", String)
], CreatePendingUserDto.prototype, "UserMemberSurname", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "UserMemberEmail",
    }),
    __metadata("design:type", String)
], CreatePendingUserDto.prototype, "UserMemberEmail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "UserMemberPhone",
    }),
    __metadata("design:type", String)
], CreatePendingUserDto.prototype, "UserMemberPhone", void 0);
exports.CreatePendingUserDto = CreatePendingUserDto;
//# sourceMappingURL=create-pendinguser.dto.js.map