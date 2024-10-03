import { Request } from "express";
import { AppLoggerService } from "src/shared/app-logger";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { CreateUserLogsDto } from "./dto";
import { UserLogs } from "./entities/user-logs.entity";
import { UserLogsRepository } from "./user-logs.repository";
export declare class UserLogsService {
    private readonly userLogsRepo;
    private readonly logger;
    constructor(userLogsRepo: UserLogsRepository, logger: AppLoggerService);
    createBulk(request: Request, user: GraphUserDto, createUserLogList: CreateUserLogsDto[]): Promise<UserLogs[]>;
}
