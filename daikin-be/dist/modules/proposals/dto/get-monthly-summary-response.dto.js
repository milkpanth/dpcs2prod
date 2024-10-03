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
exports.GetMonthlySummaryResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const proposal_entity_1 = require("../entities/proposal.entity");
class GetMonthlySummaryResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "new proposal",
        type: "number",
        example: 1,
    }),
    __metadata("design:type", Number)
], GetMonthlySummaryResponseDto.prototype, "newProposal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "edit proposal",
        type: "number",
        example: 1,
    }),
    __metadata("design:type", Number)
], GetMonthlySummaryResponseDto.prototype, "editProposal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "company rank",
        type: proposal_entity_1.ProposalRank,
        example: proposal_entity_1.ProposalRank,
    }),
    __metadata("design:type", Array)
], GetMonthlySummaryResponseDto.prototype, "companyRank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "self rank",
        type: proposal_entity_1.ProposalRank,
        example: proposal_entity_1.ProposalRank,
    }),
    __metadata("design:type", proposal_entity_1.ProposalRank)
], GetMonthlySummaryResponseDto.prototype, "selfRank", void 0);
exports.GetMonthlySummaryResponseDto = GetMonthlySummaryResponseDto;
//# sourceMappingURL=get-monthly-summary-response.dto.js.map