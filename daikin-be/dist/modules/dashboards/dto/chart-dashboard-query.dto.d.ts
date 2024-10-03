import { TableDashboardQueryDto } from "./table-dashboard-query.dto";
declare const ChartDashboardQueryDto_base: import("@nestjs/common").Type<Omit<TableDashboardQueryDto, "limit" | "page">>;
export declare class ChartDashboardQueryDto extends ChartDashboardQueryDto_base {
}
export {};
