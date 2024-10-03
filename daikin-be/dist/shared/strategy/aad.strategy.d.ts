import { ConfigService } from "@nestjs/config";
import { BearerStrategy } from "passport-azure-ad";
import { GraphUserDto } from "../msgraph/dto/graph-user.dto";
import { UsersService } from "../../modules/users/users.service";
declare const AzureADStrategy_base: new (...args: any[]) => BearerStrategy;
export declare class AzureADStrategy extends AzureADStrategy_base {
    protected readonly configService: ConfigService;
    protected readonly usersService: UsersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: GraphUserDto): Promise<GraphUserDto>;
}
export {};
