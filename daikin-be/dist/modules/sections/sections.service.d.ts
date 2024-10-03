/// <reference types="node" />
import { Pagination } from "nestjs-typeorm-paginate";
import { Stream } from "stream";
import { DataSource, Repository } from "typeorm";
import { Section } from "../../modules/sections/entities/section.entity";
import { CompanyDto } from "../../shared/dto/company-query.dto";
import { DropdownDto } from "../../shared/dto/dropdown-query.dto";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { Live, Use } from "../../shared/enum/DataStateEnum";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { CategoriesRepository } from "../categories/categories.repository";
import { Category } from "../categories/entities/category.entity";
import { Company } from "../companies/entities/company.entity";
import { Tag } from "../tags/entities/tag.entity";
import { TagsService } from "../tags/tags.service";
import { CreateSectionDto } from "./dto/create-section.dto";
import { SectionPaginationDto } from "./dto/pagination-section.dto";
import { UpdateSectionDto } from "./dto/update-section.dto";
import { SectionsRepository } from "./sections.repository";
export declare class SectionsService {
    private readonly useSectionsRepository;
    private readonly liveSectionsRepository;
    private readonly useCompanyRepository;
    private readonly useCategoryRepository;
    private dataSource;
    private tagsService;
    private readonly sectionRepo;
    private readonly categoryRepo;
    constructor(useSectionsRepository: Repository<Section>, liveSectionsRepository: Repository<Section>, useCompanyRepository: Repository<Company>, useCategoryRepository: Repository<Category>, dataSource: DataSource, tagsService: TagsService, sectionRepo: SectionsRepository, categoryRepo: CategoriesRepository);
    create(graphUser: GraphUserDto, createArraySectionDto: CreateSectionDto[]): Promise<({
        CompanyCode: any;
        Use: Use;
        Live: Live;
        CategoryID: number;
        Name: string;
        AlwaysDisplay: boolean;
        SameName: boolean;
    } & Section)[][]>;
    findAll(graphUser: GraphUserDto, queryPayload: SectionPaginationDto): Promise<Pagination<Section>>;
    findById(id: number): Promise<Section>;
    findSectionByName(graphUser: GraphUserDto, searchDto: SearchDto): Promise<Section[]>;
    update(graphUser: GraphUserDto, updateArraySectionDto: UpdateSectionDto[]): Promise<import("typeorm").UpdateResult[]>;
    remove(graphUser: GraphUserDto, ids: number[]): Promise<import("typeorm").UpdateResult>;
    dropdown(graphUser: GraphUserDto, query: DropdownDto): Promise<Section[]>;
    download(graphUser: GraphUserDto, companyQuery: CompanyDto, res: Stream): Promise<void>;
    sectionTags(companyDto: CompanyDto): Promise<Tag[]>;
}
