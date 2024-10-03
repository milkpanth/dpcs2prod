/// <reference types="node" />
import { Pagination } from "nestjs-typeorm-paginate";
import { Stream } from "stream";
import { DataSource, Repository } from "typeorm";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { Live, Use } from "../../shared/enum/DataStateEnum";
import { ModelRepository } from "../models/model.repository";
import { TagsService } from "../tags/tags.service";
import { CreateSeriesDto } from "./dto/create-series.dto";
import { ExportModelLinkSeriesDto } from "./dto/export-modellink.dto";
import { UpdateSeriesDto } from "./dto/update-series.dto";
import { Series } from "./entities/series.entity";
import { SeriesRepository } from "./series.repository";
export declare class SeriesService {
    private readonly seriesRepository;
    private dataSource;
    private tagsService;
    private readonly seriesRepo;
    private readonly modelRepo;
    constructor(seriesRepository: Repository<Series>, dataSource: DataSource, tagsService: TagsService, seriesRepo: SeriesRepository, modelRepo: ModelRepository);
    create(createArraySeriesDto: CreateSeriesDto[]): Promise<({
        Use: Use;
        Live: Live;
        Name: string;
        SeriesType?: number;
    } & Series)[]>;
    findAll(queryPayload: PaginationDto): Promise<Pagination<Series>>;
    findSeriesByName(searchDto: SearchDto): Promise<Series[]> | Promise<Series>;
    update(updateArraySeriesDto: UpdateSeriesDto[]): Promise<import("typeorm").UpdateResult[]>;
    remove(names: string[]): Promise<import("typeorm").UpdateResult>;
    download(res: Stream): Promise<void>;
    exportModelLinkEditSeries(res: Stream, exportModelLinkSeriesDto: ExportModelLinkSeriesDto): Promise<void>;
    dropdown(): Promise<Series[]>;
}
