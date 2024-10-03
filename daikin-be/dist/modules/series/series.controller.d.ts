import type { Response } from "express";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { CreateSeriesDto } from "./dto/create-series.dto";
import { ExportModelLinkSeriesDto } from "./dto/export-modellink.dto";
import { UpdateSeriesDto } from "./dto/update-series.dto";
import { Series } from "./entities/series.entity";
import { SeriesService } from "./series.service";
export declare class SeriesController {
    private readonly seriesService;
    constructor(seriesService: SeriesService);
    create(createArraySeriesDto: CreateSeriesDto[]): Promise<({
        Use: import("../../shared/enum/DataStateEnum").Use;
        Live: import("../../shared/enum/DataStateEnum").Live;
        Name: string;
        SeriesType?: number;
    } & Series)[]>;
    dropdown(): Promise<Series[]>;
    findAll(query?: PaginationDto): Promise<import("nestjs-typeorm-paginate").Pagination<Series, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findByName(searchDto: SearchDto): Promise<Series[]> | Promise<Series>;
    update(updateArraySeriesDto: UpdateSeriesDto[]): Promise<import("typeorm").UpdateResult[]>;
    remove(names: string[]): Promise<import("typeorm").UpdateResult>;
    download(res: Response): Promise<void>;
    modelLinkEditImage(exportModelLinkSeriesDto: ExportModelLinkSeriesDto, res: Response): Promise<void>;
}
