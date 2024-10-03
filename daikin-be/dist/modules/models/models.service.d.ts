/// <reference types="node" />
import { Pagination } from "nestjs-typeorm-paginate";
import { Stream } from "stream";
import { DataSource, Repository, UpdateResult } from "typeorm";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { Live, Use } from "../../shared/enum/DataStateEnum";
import { ImagesRepository } from "../images/images.repository";
import { ImagesService } from "../images/images.service";
import { SeriesRepository } from "../series/series.repository";
import { Series } from "./../series/entities/series.entity";
import { CreateModelDto } from "./dto/create-model.dto";
import { UpdateModelDto } from "./dto/update-model.dto";
import { ValidateModelDto } from "./dto/validate-model.dto";
import { Model } from "./entities/model.entity";
import { ModelRepository } from "./model.repository";
export declare class ModelsService {
    private readonly modelsRepository;
    private readonly seriesRepository;
    private dataSource;
    private imagesService;
    private readonly modelRepo;
    private readonly imageRepo;
    private readonly seriesRepo;
    constructor(modelsRepository: Repository<Model>, seriesRepository: Repository<Series>, dataSource: DataSource, imagesService: ImagesService, modelRepo: ModelRepository, imageRepo: ImagesRepository, seriesRepo: SeriesRepository);
    create(createArrayModelDto: CreateModelDto[]): Promise<({
        Use: Use;
        Live: Live;
        Name: string;
        SeriesName?: string;
        ImageID?: number;
    } & Model)[]>;
    findAll(queryPayload: PaginationDto): Promise<Pagination<Model>>;
    findModelsByName(searchDto: SearchDto): Promise<Model[]>;
    validateModel(validateDto: ValidateModelDto): Promise<{
        matchModel: any;
        matchSeries: any;
    }>;
    update(updateArrayModelDto: UpdateModelDto[]): Promise<UpdateResult[]>;
    remove(names: string[]): Promise<UpdateResult>;
    download(res: Stream): Promise<void>;
    dropdown(): Promise<Model[]>;
}
