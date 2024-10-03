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
exports.DashboardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const response_template_1 = require("../../shared/decorators/response-template");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const proposal_entity_1 = require("../proposals/entities/proposal.entity");
const dashboards_service_1 = require("./dashboards.service");
const chart_dashboard_query_dto_1 = require("./dto/chart-dashboard-query.dto");
const table_dashboard_query_dto_1 = require("./dto/table-dashboard-query.dto");
let DashboardsController = class DashboardsController {
    constructor(dashboardsService) {
        this.dashboardsService = dashboardsService;
    }
    table(graphUser, tableDashboardQueryDto) {
        return this.dashboardsService.dashboardTable(graphUser, tableDashboardQueryDto);
    }
    chart(graphUser, chartDashboardQueryDto) {
        return this.dashboardsService.dashboardChart(graphUser, chartDashboardQueryDto);
    }
};
__decorate([
    (0, common_1.Post)("table"),
    (0, swagger_1.ApiOperation)({
        summary: "Get table dashboards information",
        description: "Get list table dashboard information",
    }),
    (0, response_template_1.ApiPaginatedTemplateResponse)({
        model: proposal_entity_1.Proposal,
        description: "Response get list table dashboard information",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        table_dashboard_query_dto_1.TableDashboardQueryDto]),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "table", null);
__decorate([
    (0, common_1.Post)("chart"),
    (0, swagger_1.ApiOperation)({
        summary: "Get chart dashboards information",
        description: "Get list chart dashboard information",
    }),
    (0, response_template_1.ApiOkListTemplateResponse)({
        model: proposal_entity_1.Proposal,
        description: "Response get list chart dashboard information",
    }),
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto,
        chart_dashboard_query_dto_1.ChartDashboardQueryDto]),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "chart", null);
DashboardsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("Dashboard"),
    (0, common_1.Controller)("dashboards"),
    __metadata("design:paramtypes", [dashboards_service_1.DashboardsService])
], DashboardsController);
exports.DashboardsController = DashboardsController;
//# sourceMappingURL=dashboards.controller.js.map