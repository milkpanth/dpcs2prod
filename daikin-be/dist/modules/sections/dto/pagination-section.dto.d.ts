import { PaginationWithCompanyDto } from "../../../shared/dto/pagination-query-company";
export declare class SectionPaginationDto extends PaginationWithCompanyDto {
    SameName?: boolean;
    tagIDs?: number[];
}
