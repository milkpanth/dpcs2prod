import { Pagination } from "nestjs-typeorm-paginate";
import { FindOptionsRelations, Repository } from "typeorm";
import { AppLoggerService } from "../../shared/app-logger";
import { PaginationWithCompanyDto } from "../../shared/dto/pagination-query-company";
import { DataBaseTypeEnum } from "../../shared/enum/database-type.enum";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { Category } from "./entities/category.entity";
export declare class CategoriesRepository {
    private useCategoryRepo;
    private liveCategoryRepo;
    private readonly logger;
    constructor(useCategoryRepo: Repository<Category>, liveCategoryRepo: Repository<Category>, logger: AppLoggerService);
    findById(id: number, databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<Category>): Promise<Category>;
    findOneWithWhereConditions(whereConditions: Category | Category[] | any, databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<Category>): Promise<Category>;
    findWithWhereConditions(whereConditions: Category | Category[] | any, databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<Category>): Promise<Category[]>;
    insertOrUpsert(category: Category | any, databaseType: DataBaseTypeEnum): Promise<Category>;
    findAll(queryPayload: PaginationWithCompanyDto, graphUser: GraphUserDto, databaseType: DataBaseTypeEnum): Promise<Pagination<Category>>;
}
