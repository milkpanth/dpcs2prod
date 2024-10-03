import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { FindOptionsWhere } from "typeorm";
import { PaginationDto } from "../shared/dto/pagination-query.dto";
export declare const getBasePaginationOption: (paginationDto?: PaginationDto) => IPaginationOptions;
export declare const getBaseOrderingOption: (paginationDto?: PaginationDto) => any;
export declare const getBaseWhereOption: (paginationDto: PaginationDto, onKeywordOption: FindOptionsWhere<any>[] | FindOptionsWhere<any>, onBaseOption?: FindOptionsWhere<any>[] | FindOptionsWhere<any>) => FindOptionsWhere<any>;
export declare const getBaseStatusOption: (statusDto: PaginationDto) => FindOptionsWhere<any>;
