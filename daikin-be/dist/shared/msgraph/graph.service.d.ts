import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { GraphUserWithCompany } from "./dto/graph-user-company.dto";
import { GraphUserDto } from "./dto/graph-user.dto";
import { InviteUserResponseDto } from "./dto/invite-user-response.dto";
export declare class GraphService {
    private httpService;
    private configService;
    private confidentialClientApplication;
    private SELECTED_ATTRIBUTE;
    constructor(httpService: HttpService, configService: ConfigService);
    listUser(): Promise<GraphUserDto[]>;
    getUserFromGraph(openID: string): Promise<GraphUserWithCompany>;
    inviteUser(email: string): Promise<InviteUserResponseDto>;
    setUserProperty(id: string, propertyObject: any): Promise<void>;
    getAccessToken(): Promise<string>;
}
