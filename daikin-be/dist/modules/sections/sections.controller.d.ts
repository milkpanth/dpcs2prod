import type { Response } from "express";
import { CompanyDto } from "../../shared/dto/company-query.dto";
import { DropdownDto } from "../../shared/dto/dropdown-query.dto";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { Tag } from "../tags/entities/tag.entity";
import { CreateSectionDto } from "./dto/create-section.dto";
import { SectionPaginationDto } from "./dto/pagination-section.dto";
import { UpdateSectionDto } from "./dto/update-section.dto";
import { Section } from "./entities/section.entity";
import { SectionsService } from "./sections.service";
export declare class SectionsController {
    private readonly sectionsService;
    constructor(sectionsService: SectionsService);
    create(user: GraphUserDto, createArraySectionDto: CreateSectionDto[]): Promise<({
        CompanyCode: any;
        Use: import("../../shared/enum/DataStateEnum").Use;
        Live: import("../../shared/enum/DataStateEnum").Live;
        CategoryID: number;
        Name: string;
        AlwaysDisplay: boolean;
        SameName: boolean;
    } & Section)[][]>;
    findAll(user: GraphUserDto, body?: SectionPaginationDto): Promise<import("nestjs-typeorm-paginate").Pagination<Section, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    dropdown(user: GraphUserDto, query?: DropdownDto): Promise<Section[]>;
    sectionTags(query?: CompanyDto): Promise<Tag[]>;
    findById(id: number): Promise<Section>;
    findByName(user: GraphUserDto, searchDto: SearchDto): Promise<Section[]>;
    update(user: GraphUserDto, updateArraySectionDto: UpdateSectionDto[]): Promise<import("typeorm").UpdateResult[]>;
    remove(user: GraphUserDto, ids: number[]): Promise<import("typeorm").UpdateResult>;
    download(user: GraphUserDto, companyQuery: CompanyDto, res: Response): Promise<void>;
}
