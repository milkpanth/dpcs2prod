import { type Response } from "express";
import { CompanyDto } from "../../shared/dto/company-query.dto";
import { PaginationWithCompanyDto } from "../../shared/dto/pagination-query-company";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { DropdownCategoriesDto } from "./dto/dropdown-query.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(user: GraphUserDto, createArrayCategoryDto: CreateCategoryDto[]): Promise<({
        CompanyCode: any;
        Use: import("../../shared/enum/DataStateEnum").Use;
        Live: import("../../shared/enum/DataStateEnum").Live;
        Name: string;
        SameName: boolean;
        AlwaysDisplay: boolean;
    } & Category)[][]>;
    findAll(user: GraphUserDto, query?: PaginationWithCompanyDto): Promise<import("nestjs-typeorm-paginate").Pagination<Category, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    dropdown(user: GraphUserDto, query?: DropdownCategoriesDto): Promise<Category[]>;
    findById(id: number): Promise<Category>;
    findByName(user: GraphUserDto, searchDto: SearchDto): Promise<Category | Category[]>;
    update(user: GraphUserDto, updateArrayCategoryDto: UpdateCategoryDto[]): Promise<import("typeorm").UpdateResult[]>;
    remove(user: GraphUserDto, ids: number[]): Promise<import("typeorm").UpdateResult>;
    download(user: GraphUserDto, companyQuery: CompanyDto, res: Response): Promise<void>;
}
