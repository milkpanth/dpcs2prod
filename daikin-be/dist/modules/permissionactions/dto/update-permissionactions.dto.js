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
exports.UpdatePermissionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdatePermissionDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: "ActionID",
    }),
    __metadata("design:type", Number)
], UpdatePermissionDto.prototype, "ActionID", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        description: "Read",
    }),
    __metadata("design:type", Boolean)
], UpdatePermissionDto.prototype, "Read", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        description: "Modify",
    }),
    __metadata("design:type", Boolean)
], UpdatePermissionDto.prototype, "Modify", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        description: "Delete",
    }),
    __metadata("design:type", Boolean)
], UpdatePermissionDto.prototype, "Delete", void 0);
exports.UpdatePermissionDto = UpdatePermissionDto;
//# sourceMappingURL=update-permissionactions.dto.js.map