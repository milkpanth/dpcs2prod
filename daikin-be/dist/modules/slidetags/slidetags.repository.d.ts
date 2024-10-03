import { FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { AppLoggerService } from "../../shared/app-logger";
import { DataBaseTypeEnum } from "../../shared/enum/database-type.enum";
import { SlideTag } from "./entities/slidetag.entity";
export declare class SlideTagsRepository {
    private useSlideTagRepo;
    private liveSlideTagRepo;
    private readonly logger;
    constructor(useSlideTagRepo: Repository<SlideTag>, liveSlideTagRepo: Repository<SlideTag>, logger: AppLoggerService);
    findOneWithWhereConditions(whereConditions: FindOptionsWhere<SlideTag> | FindOptionsWhere<SlideTag>[], databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<SlideTag>): Promise<SlideTag>;
    findWithWhereConditions(whereConditions: SlideTag | SlideTag[] | any, databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<SlideTag>): Promise<SlideTag[]>;
}
