import type { Response } from "express";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { CreateModelDto } from "./dto/create-model.dto";
import { UpdateModelDto } from "./dto/update-model.dto";
import { ValidateModelDto } from "./dto/validate-model.dto";
import { Model } from "./entities/model.entity";
import { ModelsService } from "./models.service";
export declare class ModelsController {
    private readonly modelsService;
    constructor(modelsService: ModelsService);
    create(createArrayModelDto: CreateModelDto[]): Promise<({
        Use: import("../../shared/enum/DataStateEnum").Use;
        Live: import("../../shared/enum/DataStateEnum").Live;
        Name: string;
        SeriesName?: string;
        ImageID?: number;
    } & Model)[]>;
    dropdown(): Promise<Model[]>;
    findAll(query?: PaginationDto): Promise<import("nestjs-typeorm-paginate").Pagination<Model, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findByName(searchDto: SearchDto): Promise<Model[]>;
    validateModel(validateDto: ValidateModelDto): Promise<{
        matchModel: any;
        matchSeries: any;
    }>;
    update(updateArrayModelDto: UpdateModelDto[]): Promise<import("typeorm").UpdateResult[]>;
    remove(names: string[]): Promise<import("typeorm").UpdateResult>;
    download(res: Response): Promise<void>;
}
