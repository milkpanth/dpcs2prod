import { Live, Use } from "../enum/DataStateEnum";
export declare class PaginationDto {
    limit?: number;
    page?: number;
    keyword?: string;
    order?: string;
    direction?: "ASC" | "DESC";
    live?: boolean;
    liveStatus: Live[];
    useStatus: Use[];
}
