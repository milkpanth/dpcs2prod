import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { Proposal } from "../proposals/entities/proposal.entity";
import { DashboardsService } from "./dashboards.service";
import { ChartDashboardQueryDto } from "./dto/chart-dashboard-query.dto";
import { TableDashboardQueryDto } from "./dto/table-dashboard-query.dto";
export declare class DashboardsController {
    private readonly dashboardsService;
    constructor(dashboardsService: DashboardsService);
    table(graphUser: GraphUserDto, tableDashboardQueryDto: TableDashboardQueryDto): Promise<import("nestjs-typeorm-paginate").Pagination<Proposal, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    chart(graphUser: GraphUserDto, chartDashboardQueryDto: ChartDashboardQueryDto): Promise<any[]>;
}
