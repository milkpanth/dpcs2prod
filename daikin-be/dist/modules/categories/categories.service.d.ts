/// <reference types="node" />
import { Pagination } from "nestjs-typeorm-paginate";
import { Stream } from "stream";
import { DataSource, Repository } from "typeorm";
import { Category } from "../../modules/categories/entities/category.entity";
import { CompanyDto } from "../../shared/dto/company-query.dto";
import { PaginationWithCompanyDto } from "../../shared/dto/pagination-query-company";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { Live } from "../../shared/enum/DataStateEnum";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { Company } from "../companies/entities/company.entity";
import { Section } from "../sections/entities/section.entity";
import { SectionsRepository } from "../sections/sections.repository";
import { Use } from "./../../shared/enum/DataStateEnum";
import { CategoriesRepository } from "./categories.repository";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { DropdownCategoriesDto } from "./dto/dropdown-query.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
export declare class CategoriesService {
    private readonly useCategoriesRepository;
    private readonly liveCategoriesRepository;
    private readonly useCompanyRepository;
    private readonly useSectionRepository;
    private readonly liveSectionRepository;
    private dataSource;
    private readonly categoryRepo;
    private readonly sectionRepo;
    constructor(useCategoriesRepository: Repository<Category>, liveCategoriesRepository: Repository<Category>, useCompanyRepository: Repository<Company>, useSectionRepository: Repository<Section>, liveSectionRepository: Repository<Section>, dataSource: DataSource, categoryRepo: CategoriesRepository, sectionRepo: SectionsRepository);
    create(graphUser: GraphUserDto, createArrayCategoryDto: CreateCategoryDto[]): Promise<({
        CompanyCode: any;
        Use: Use;
        Live: Live;
        Name: string;
        SameName: boolean;
        AlwaysDisplay: boolean;
    } & Category)[][]>;
    findAll(graphUser: GraphUserDto, queryPayload: PaginationWithCompanyDto): Promise<Pagination<Category>>;
    findById(id: number): Promise<Category>;
    findCategoryByName(graphUser: GraphUserDto, searchDto: SearchDto): Promise<Category | Category[]>;
    update(graphUser: GraphUserDto, updateArrayCategoryDto: UpdateCategoryDto[]): Promise<import("typeorm").UpdateResult[]>;
    remove(graphUser: GraphUserDto, ids: number[]): Promise<import("typeorm").UpdateResult>;
    download(graphUser: GraphUserDto, companyQuery: CompanyDto, res: Stream): Promise<void>;
    dropdown(graphUser: GraphUserDto, query: DropdownCategoriesDto): Promise<Category[]>;
}
