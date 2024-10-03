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
exports.ProposalRank = exports.Proposal = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_1 = require("../../../shared/entities/base");
const ProposalStatusEnum_1 = require("../../../shared/enum/ProposalStatusEnum");
const user_entity_1 = require("../../users/entities/user.entity");
const proposal_type_enum_1 = require("./proposal-type.enum");
let Proposal = class Proposal extends base_1.BaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Proposal.prototype, "ProposalID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "project name",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "text", unique: true }),
    __metadata("design:type", String)
], Proposal.prototype, "ProjectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "customer name",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Proposal.prototype, "CustomerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "project address",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Proposal.prototype, "ProjectAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "proposal type",
        type: "enum",
        example: proposal_type_enum_1.ProposalTypeEnum.PROPOSAL,
    }),
    (0, typeorm_1.Column)({ type: "enum", enum: proposal_type_enum_1.ProposalTypeEnum }),
    __metadata("design:type", String)
], Proposal.prototype, "Type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "company profile language",
        type: "char",
        maxLength: 2,
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "char", length: 2 }),
    __metadata("design:type", String)
], Proposal.prototype, "CompanyProfileLanguage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "PDF File",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Proposal.prototype, "PDFFile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "PPTX File",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Proposal.prototype, "PPTXFile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "expire date",
        type: "datetime",
        example: new Date(),
    }),
    (0, typeorm_1.Column)({ type: "datetime" }),
    __metadata("design:type", Date)
], Proposal.prototype, "ExpireDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "status",
        type: "enum",
        example: ProposalStatusEnum_1.ProposalStatusEnum.WORKING,
    }),
    (0, typeorm_1.Column)({ type: "enum", enum: ProposalStatusEnum_1.ProposalStatusEnum }),
    __metadata("design:type", String)
], Proposal.prototype, "Status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "equipment list",
        type: "any",
        example: [],
    }),
    (0, typeorm_1.Column)({
        type: "longtext",
        transformer: {
            to(value) {
                return JSON.stringify(value);
            },
            from(value) {
                return JSON.parse(value);
            },
        },
    }),
    __metadata("design:type", Array)
], Proposal.prototype, "EquipmentList", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "version",
        type: () => user_entity_1.User,
        example: () => user_entity_1.User,
    }),
    (0, typeorm_1.Column)({ type: "int", unsigned: true }),
    __metadata("design:type", Number)
], Proposal.prototype, "Version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Owner",
        type: () => user_entity_1.User,
        example: () => user_entity_1.User,
    }),
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: "CreatedBy" }),
    __metadata("design:type", user_entity_1.User)
], Proposal.prototype, "Owner", void 0);
Proposal = __decorate([
    (0, typeorm_1.Entity)({ name: "proposals" })
], Proposal);
exports.Proposal = Proposal;
class ProposalRank {
}
exports.ProposalRank = ProposalRank;
//# sourceMappingURL=proposal.entity.js.map