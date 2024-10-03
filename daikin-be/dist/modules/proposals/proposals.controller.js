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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_1 = require("../../shared/constants/auth");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const slide_entity_1 = require("../slides/entities/slide.entity");
const dto_1 = require("./dto");
const generate_proposal_dto_1 = require("./dto/generate-proposal.dto");
const get_proposal_dto_1 = require("./dto/get-proposal.dto");
const select_proposal_dto_1 = require("./dto/select-proposal.dto");
const proposal_entity_1 = require("./entities/proposal.entity");
const proposals_service_1 = require("./proposals.service");
let ProposalController = class ProposalController {
    constructor(proposalsService) {
        this.proposalsService = proposalsService;
    }
    findAll(user, query) {
        return this.proposalsService.findAll(user, query);
    }
    async downloadPowerpoint(path) {
        return this.proposalsService.downloadProposal(path);
    }
    dropdownMenulist(equipments) {
        return this.proposalsService.dropdownMenulist(equipments);
    }
    listSelectorProposal(sectionID) {
        return this.proposalsService.listSelectorProposal(sectionID);
    }
    findMonthlySummary(user) {
        return this.proposalsService.findMonthlySummary(user);
    }
    findOne(id) {
        return this.proposalsService.findOne(id);
    }
    createProposal(user, generateProposalDto) {
        return this.proposalsService.createProposalJob(user, generateProposalDto);
    }
    findProposal(user, generateProposalDto) {
        return this.proposalsService.findProposal(user, generateProposalDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get proposals information",
        description: "Get list proposal information",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.GetAllProposalResponseDto,
        description: "Response get list proposal information",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto, get_proposal_dto_1.GetProposalDto]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("download/:path"),
    (0, swagger_1.ApiOperation)({
        summary: "Download proposal",
        description: "Download proposal",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "Response downloaded",
    }),
    (0, common_1.SetMetadata)(auth_1.ALLOW_UNAUTHORIZED_KEY, true),
    __param(0, (0, common_1.Param)("path")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "downloadPowerpoint", null);
__decorate([
    (0, common_1.Get)("menu"),
    (0, swagger_1.ApiOperation)({
        summary: "Get proposals dropdown menu list information",
        description: "Get proposal menu list dropdown information",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        description: "Response get proposal menu list dropdown information",
    }),
    __param(0, (0, common_1.Query)("equipments")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "dropdownMenulist", null);
__decorate([
    (0, common_1.Get)("slides"),
    (0, swagger_1.ApiOperation)({
        summary: "Get list selector proposal",
        description: "Get list selector proposal",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: slide_entity_1.Slide,
        description: "Response get list selector proposal",
    }),
    __param(0, (0, common_1.Query)("sectionID")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "listSelectorProposal", null);
__decorate([
    (0, common_1.Get)("monthly-summary"),
    (0, swagger_1.ApiOperation)({
        summary: "Get monthly summary",
        description: "Get monthly summary",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.GetMonthlySummaryResponseDto,
        description: "Response get monthly summary",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "findMonthlySummary", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Get proposal by id",
        description: "Get proposal by id",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: proposal_entity_1.Proposal,
        description: "Response get proposal by id",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("generate"),
    (0, swagger_1.ApiOperation)({
        summary: "Create proposal job",
        description: "Create proposal job",
    }),
    (0, response_template_1.ApiNoContentTemplateResponse)({
        description: "Response created",
    }),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({ type: generate_proposal_dto_1.GenerateProposalDto }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        generate_proposal_dto_1.GenerateProposalDto]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "createProposal", null);
__decorate([
    (0, common_1.Post)("select"),
    (0, swagger_1.ApiOperation)({
        summary: "Select proposal",
        description: "Select proposal",
    }),
    (0, response_template_1.ApiOkTemplateResponse)({
        model: dto_1.SelectProposalResponseDto,
        description: "Response Select proposal",
    }),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({ type: select_proposal_dto_1.SelectProposalDto }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        select_proposal_dto_1.SelectProposalDto]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "findProposal", null);
ProposalController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("Proposal"),
    (0, common_1.Controller)("proposals"),
    __metadata("design:paramtypes", [proposals_service_1.ProposalService])
], ProposalController);
exports.ProposalController = ProposalController;
//# sourceMappingURL=proposals.controller.js.map