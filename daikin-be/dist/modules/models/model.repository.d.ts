import { Pagination } from "nestjs-typeorm-paginate";
import { FindOptionsRelations, Repository } from "typeorm";
import { AppLoggerService } from "../../shared/app-logger";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { DataBaseTypeEnum } from "../../shared/enum/database-type.enum";
import { Model } from "./entities/model.entity";
export declare class ModelRepository {
    private useModelRepo;
    private liveModelRepo;
    private readonly logger;
    constructor(useModelRepo: Repository<Model>, liveModelRepo: Repository<Model>, logger: AppLoggerService);
    findOneWithWhereConditions(whereConditions: Model | any, databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<Model>): Promise<Model>;
    findWithWhereConditions(whereConditions: Model | Model[] | any, databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<Model>): Promise<Model[]>;
    insertOrUpsert(Model: Model | any, databaseType: DataBaseTypeEnum): Promise<Model>;
    findAll(queryPayload: PaginationDto, databaseType: DataBaseTypeEnum): Promise<Pagination<Model>>;
}
