import { Pagination } from "nestjs-typeorm-paginate";
import { DeleteResult, FindOptionsRelations, Repository } from "typeorm";
import { AppLoggerService } from "../../shared/app-logger";
import { DataBaseTypeEnum } from "../../shared/enum/database-type.enum";
import { Live, Use } from "../../shared/enum/DataStateEnum";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { SectionPaginationDto } from "./dto/pagination-section.dto";
import { Section } from "./entities/section.entity";
export declare class SectionsRepository {
    private useSectionRepo;
    private liveSectionRepo;
    private readonly logger;
    constructor(useSectionRepo: Repository<Section>, liveSectionRepo: Repository<Section>, logger: AppLoggerService);
    findOneWithWhereConditions(whereConditions: Section | any, databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<Section>): Promise<Section>;
    findWithWhereConditions(whereConditions: Section | Section[] | any, databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<Section>): Promise<Section[]>;
    insertOrUpsert(section: Section | any, databaseType: DataBaseTypeEnum): Promise<Section>;
    findAll(queryPayload: SectionPaginationDto, graphUser: GraphUserDto, databaseType: DataBaseTypeEnum): Promise<Pagination<Section>>;
    deleteByStatus(companyCode: string, status: Use | Live, databaseType: DataBaseTypeEnum): Promise<DeleteResult>;
    deleteById(id: number, databaseType: DataBaseTypeEnum): Promise<DeleteResult>;
    deleteByIds(ids: number[], databaseType: DataBaseTypeEnum): Promise<DeleteResult>;
}
