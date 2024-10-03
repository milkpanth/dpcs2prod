import { Pagination } from "nestjs-typeorm-paginate";
import { FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { AppLoggerService } from "../../shared/app-logger";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { DataBaseTypeEnum } from "../../shared/enum/database-type.enum";
import { Image } from "./entities/image.entity";
export declare class ImagesRepository {
    private useImageRepo;
    private liveImageRepo;
    private readonly logger;
    constructor(useImageRepo: Repository<Image>, liveImageRepo: Repository<Image>, logger: AppLoggerService);
    findOneWithWhereConditions(whereConditions: FindOptionsWhere<Image> | FindOptionsWhere<Image>[], databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<Image>): Promise<Image>;
    findAll(queryPayload: PaginationDto, databaseType: DataBaseTypeEnum): Promise<Pagination<Image>>;
}
