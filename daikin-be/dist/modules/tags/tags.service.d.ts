/// <reference types="node" />
import { Pagination } from "nestjs-typeorm-paginate";
import { Stream } from "stream";
import { DataSource, EntityManager, Repository } from "typeorm";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Tag } from "./entities/tag.entity";
import { TagsRepository } from "./tags.repository";
export declare class TagsService {
    private readonly tagsRepository;
    private dataSource;
    private readonly tagRepo;
    private readonly logger;
    constructor(tagsRepository: Repository<Tag>, dataSource: DataSource, tagRepo: TagsRepository);
    create(createArrayTagDto: CreateTagDto[]): Promise<import("typeorm").InsertResult>;
    findAll(queryPayload: PaginationDto): Promise<Pagination<Tag>>;
    findById(id: number): Promise<Tag>;
    findTagByName(searchDto: SearchDto): Promise<Tag[]> | Promise<Tag>;
    update(updateArrayTagDto: UpdateTagDto[]): Promise<import("typeorm").UpdateResult[]>;
    remove(ids: number[]): Promise<import("typeorm").UpdateResult>;
    dropdown(IsSeriesType: boolean): Promise<Tag[]>;
    updateTagCounter(entityManager: EntityManager, tagToUpdate: Set<number>): Promise<void>;
    download(res: Stream): Promise<void>;
}
