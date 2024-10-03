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
exports.CreateProposalDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const proposal_type_enum_1 = require("../entities/proposal-type.enum");
class CreateProposalDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        required: true,
        type: String,
        description: 'ProposalID',
    }),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "ProposalID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'ProjectName',
    }),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "ProjectName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'CustomerName',
    }),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "CustomerName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'CustomerName',
    }),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "ProjectAddress", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(() => proposal_type_enum_1.ProposalTypeEnum),
    (0, swagger_1.ApiPropertyOptional)({
        enum: proposal_type_enum_1.ProposalTypeEnum,
        description: 'ProposalType',
    }),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "Type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'CompanyProfileLanguage',
    }),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "CompanyProfileLanguage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'PDFFile',
    }),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "PDFFile", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'PDFFile',
    }),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "PPTXFile", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'PDFFile',
    }),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "ExpireDate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: 'Version',
    }),
    __metadata("design:type", Number)
], CreateProposalDto.prototype, "Version", void 0);
exports.CreateProposalDto = CreateProposalDto;
//# sourceMappingURL=create-proposal.dto.js.map