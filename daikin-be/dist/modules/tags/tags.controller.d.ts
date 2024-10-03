import type { Response } from "express";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Tag } from "./entities/tag.entity";
import { TagsService } from "./tags.service";
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(createArrayTagDto: CreateTagDto[]): Promise<import("typeorm").InsertResult>;
    findAll(query?: PaginationDto): Promise<import("nestjs-typeorm-paginate").Pagination<Tag, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    dropdown(query?: {
        IsSeriesType: string;
    }): Promise<Tag[]>;
    findById(id: number): Promise<Tag>;
    findByName(searchDto: SearchDto): Promise<Tag[]> | Promise<Tag>;
    update(updateArrayTagDto: UpdateTagDto[]): Promise<import("typeorm").UpdateResult[]>;
    remove(ids: number[]): Promise<import("typeorm").UpdateResult>;
    download(res: Response): Promise<void>;
}
