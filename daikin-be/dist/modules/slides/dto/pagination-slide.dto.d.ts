import { PaginationWithCompanyDto } from "../../../shared/dto/pagination-query-company";
export declare class SlidePaginationDto extends PaginationWithCompanyDto {
    languages?: string[];
    sectionIDs?: number[];
    tagIDs?: number[];
}
