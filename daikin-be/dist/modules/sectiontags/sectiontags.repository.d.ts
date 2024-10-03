import { FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { AppLoggerService } from "../../shared/app-logger";
import { DataBaseTypeEnum } from "../../shared/enum/database-type.enum";
import { SectionTag } from "./entities/sectiontag.entity";
export declare class SectionTagsRepository {
    private useSectionTagRepo;
    private liveSectionTagRepo;
    private readonly logger;
    constructor(useSectionTagRepo: Repository<SectionTag>, liveSectionTagRepo: Repository<SectionTag>, logger: AppLoggerService);
    findOneWithWhereConditions(whereConditions: FindOptionsWhere<SectionTag> | FindOptionsWhere<SectionTag>[], databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<SectionTag>): Promise<SectionTag>;
    findWithWhereConditions(whereConditions: SectionTag | SectionTag[] | any, databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<SectionTag>): Promise<SectionTag[]>;
}
