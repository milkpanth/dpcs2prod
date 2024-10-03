import { Pagination } from "nestjs-typeorm-paginate";
import { FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { AppLoggerService } from "../../shared/app-logger";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { DataBaseTypeEnum } from "../../shared/enum/database-type.enum";
import { Tag } from "./entities/tag.entity";
export declare class TagsRepository {
    private useTagRepo;
    private liveTagRepo;
    private readonly logger;
    constructor(useTagRepo: Repository<Tag>, liveTagRepo: Repository<Tag>, logger: AppLoggerService);
    findAll(queryPayload: PaginationDto, databaseType: DataBaseTypeEnum): Promise<Pagination<Tag>>;
    findOneWithWhereConditions(whereConditions: FindOptionsWhere<Tag> | FindOptionsWhere<Tag>[], databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<Tag>): Promise<Tag>;
    findWithWhereConditions(whereConditions: Tag | Tag[] | any, databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<Tag>): Promise<Tag[]>;
}
