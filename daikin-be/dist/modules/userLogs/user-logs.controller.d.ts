import { Request } from "express";
import { GraphUserDto } from "src/shared/msgraph/dto/graph-user.dto";
import { CreateUserLogsDto } from "./dto";
import { UserLogs } from "./entities/user-logs.entity";
import { UserLogsService } from "./user-logs.service";
export declare class UserLogsController {
    private readonly userLogsService;
    constructor(userLogsService: UserLogsService);
    create(request: Request, user: GraphUserDto, createUserLogList: CreateUserLogsDto[]): Promise<UserLogs[]>;
}
