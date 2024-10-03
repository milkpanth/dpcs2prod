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
exports.SelectProposalResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const category_entity_1 = require("../../../modules/categories/entities/category.entity");
class SelectProposalResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "general files",
        type: [category_entity_1.Category],
    }),
    __metadata("design:type", Array)
], SelectProposalResponseDto.prototype, "generalFiles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "application files",
        type: [category_entity_1.Category],
    }),
    __metadata("design:type", Array)
], SelectProposalResponseDto.prototype, "applicationFiles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "equipment list",
        type: [category_entity_1.Category],
    }),
    __metadata("design:type", Array)
], SelectProposalResponseDto.prototype, "equipmentList", void 0);
exports.SelectProposalResponseDto = SelectProposalResponseDto;
//# sourceMappingURL=select-proposal-response.dto.js.map