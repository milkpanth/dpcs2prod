import { Repository } from "typeorm";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { ChartDashboardQueryDto } from "./dto/chart-dashboard-query.dto";
import { TableDashboardQueryDto } from "./dto/table-dashboard-query.dto";
import { Proposal } from "../proposals/entities/proposal.entity";
export declare class DashboardsService {
    private readonly proposalsRepository;
    constructor(proposalsRepository: Repository<Proposal>);
    dashboardTable(graphUser: GraphUserDto, dashboardQueryDto: TableDashboardQueryDto): Promise<import("nestjs-typeorm-paginate").Pagination<Proposal, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    dashboardChart(graphUser: GraphUserDto, dashboardQueryDto: ChartDashboardQueryDto): Promise<any[]>;
}
