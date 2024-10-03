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
exports.RequestEquipmentList = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RequestEquipmentList {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "type",
    }),
    __metadata("design:type", String)
], RequestEquipmentList.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "system",
    }),
    __metadata("design:type", String)
], RequestEquipmentList.prototype, "system", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "module",
    }),
    __metadata("design:type", String)
], RequestEquipmentList.prototype, "module", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number || String,
        description: "qty",
    }),
    __metadata("design:type", Object)
], RequestEquipmentList.prototype, "qty", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "description",
    }),
    __metadata("design:type", String)
], RequestEquipmentList.prototype, "description", void 0);
exports.RequestEquipmentList = RequestEquipmentList;
//# sourceMappingURL=request-equipments.dto.js.map