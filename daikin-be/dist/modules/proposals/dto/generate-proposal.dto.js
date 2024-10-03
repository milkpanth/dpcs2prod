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
exports.GenerateProposalDto = exports.SelectedSlideFileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const proposal_type_enum_1 = require("../entities/proposal-type.enum");
class SelectedSlideFileDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: "FileID",
    }),
    __metadata("design:type", Number)
], SelectedSlideFileDto.prototype, "FileID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: "Page",
    }),
    __metadata("design:type", Number)
], SelectedSlideFileDto.prototype, "Page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "Path",
    }),
    __metadata("design:type", String)
], SelectedSlideFileDto.prototype, "Path", void 0);
exports.SelectedSlideFileDto = SelectedSlideFileDto;
let GenerateProposalDto = class GenerateProposalDto {
};
__decorate([
    (0, class_validator_1.IsEnum)(proposal_type_enum_1.ProposalTypeEnum),
    (0, swagger_1.ApiPropertyOptional)({
        enum: proposal_type_enum_1.ProposalTypeEnum,
        description: "Type",
    }),
    __metadata("design:type", String)
], GenerateProposalDto.prototype, "Type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "ProjectName",
    }),
    __metadata("design:type", String)
], GenerateProposalDto.prototype, "ProjectName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "CustomerName",
    }),
    __metadata("design:type", String)
], GenerateProposalDto.prototype, "CustomerName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "ProjectAddress",
    }),
    __metadata("design:type", String)
], GenerateProposalDto.prototype, "ProjectAddress", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({
        isArray: true,
        type: SelectedSlideFileDto,
        description: "SelectedFile",
    }),
    __metadata("design:type", Array)
], GenerateProposalDto.prototype, "SelectedFile", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({
        isArray: true,
        type: (Array),
        description: "",
    }),
    __metadata("design:type", Array)
], GenerateProposalDto.prototype, "EquipmentList", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: "Version",
    }),
    __metadata("design:type", Number)
], GenerateProposalDto.prototype, "Version", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: "SelectedCompany",
    }),
    __metadata("design:type", String)
], GenerateProposalDto.prototype, "SelectedCompany", void 0);
GenerateProposalDto = __decorate([
    (0, swagger_1.ApiExtraModels)(SelectedSlideFileDto)
], GenerateProposalDto);
exports.GenerateProposalDto = GenerateProposalDto;
//# sourceMappingURL=generate-proposal.dto.js.map