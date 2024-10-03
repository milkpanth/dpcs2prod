export declare class TableDashboardQueryDto {
    limit: number;
    page: number;
    name?: string;
    order?: string;
    direction?: "ASC" | "DESC";
    company?: string;
    type?: string;
    startDate: Date;
    endDate: Date;
}
