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
exports.GetProposalDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetProposalDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Start date",
        type: () => String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetProposalDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "End date",
        type: () => String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetProposalDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Items per page",
        type: () => String,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.type === "all"),
    (0, class_validator_1.ValidateIf)((o) => o.search === null || o.search === undefined),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetProposalDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Page number",
        type: () => Number,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.ValidateIf)((o) => o.type === "all"),
    (0, class_validator_1.ValidateIf)((o) => o.search === null || o.search === undefined),
    (0, class_validator_1.Min)(1, { message: "Offset must be at least 1" }),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], GetProposalDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "type of req data",
        type: () => String,
    }),
    (0, class_validator_1.IsIn)(["recent", "all"]),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetProposalDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "search",
        type: () => String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetProposalDto.prototype, "search", void 0);
exports.GetProposalDto = GetProposalDto;
//# sourceMappingURL=get-proposal.dto.js.map