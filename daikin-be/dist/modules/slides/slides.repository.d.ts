import { Pagination } from "nestjs-typeorm-paginate";
import { FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { AppLoggerService } from "../../shared/app-logger";
import { DataBaseTypeEnum } from "../../shared/enum/database-type.enum";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { SlidePaginationDto } from "./dto/pagination-slide.dto";
import { Slide } from "./entities/slide.entity";
export declare class SlidesRepository {
    private useSlideRepo;
    private liveSlideRepo;
    private readonly logger;
    constructor(useSlideRepo: Repository<Slide>, liveSlideRepo: Repository<Slide>, logger: AppLoggerService);
    findOneWithWhereConditions(whereConditions: FindOptionsWhere<Slide> | FindOptionsWhere<Slide>[], databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<Slide>): Promise<Slide>;
    insertOrUpsert(slide: Slide, databaseType: DataBaseTypeEnum): Promise<Slide>;
    findAll(queryPayload: SlidePaginationDto, graphUser: GraphUserDto, databaseType: DataBaseTypeEnum): Promise<Pagination<Slide>>;
}
