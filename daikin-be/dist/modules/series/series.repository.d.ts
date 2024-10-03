import { Pagination } from "nestjs-typeorm-paginate";
import { FindOptionsRelations, Repository } from "typeorm";
import { AppLoggerService } from "../../shared/app-logger";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { DataBaseTypeEnum } from "../../shared/enum/database-type.enum";
import { Series } from "./entities/series.entity";
export declare class SeriesRepository {
    private useSeriesRepo;
    private liveSeriesRepo;
    private readonly logger;
    constructor(useSeriesRepo: Repository<Series>, liveSeriesRepo: Repository<Series>, logger: AppLoggerService);
    findOneWithWhereConditions(whereConditions: Series | any, databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<Series>): Promise<Series>;
    findWithWhereConditions(whereConditions: Series | Series[] | any, databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<Series>): Promise<Series[]>;
    insertOrUpsert(Series: Series | any, databaseType: DataBaseTypeEnum): Promise<Series>;
    findAll(queryPayload: PaginationDto, databaseType: DataBaseTypeEnum): Promise<Pagination<Series>>;
}
