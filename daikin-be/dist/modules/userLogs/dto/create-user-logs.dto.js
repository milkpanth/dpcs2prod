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
exports.CreateUserLogsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserLogsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "user member ID",
        example: "040b5c96-60c1-411a-aac9-ccd041bb2e4a",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserLogsDto.prototype, "UserMemberID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "function type",
        example: "Function name",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserLogsDto.prototype, "FunctionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "string",
        description: "detailed description",
        example: "Add detail function",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserLogsDto.prototype, "Detail", void 0);
exports.CreateUserLogsDto = CreateUserLogsDto;
//# sourceMappingURL=create-user-logs.dto.js.map