import { FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { AppLoggerService } from "../../shared/app-logger";
import { DataBaseTypeEnum } from "../../shared/enum/database-type.enum";
import { UserLogs } from "./entities/user-logs.entity";
export declare class UserLogsRepository {
    private useUserLogsRepo;
    private liveUserLogsRepo;
    private readonly logger;
    constructor(useUserLogsRepo: Repository<UserLogs>, liveUserLogsRepo: Repository<UserLogs>, logger: AppLoggerService);
    insertOrUpsert(userLogsPayLoad: UserLogs | any, databaseType: DataBaseTypeEnum): Promise<UserLogs>;
    findOneWithWhereConditions(whereConditions: FindOptionsWhere<UserLogs> | FindOptionsWhere<UserLogs>[], databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<UserLogs>): Promise<UserLogs>;
    findWithWhereConditions(whereConditions: UserLogs | UserLogs[] | any, databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<UserLogs>): Promise<UserLogs[]>;
}
