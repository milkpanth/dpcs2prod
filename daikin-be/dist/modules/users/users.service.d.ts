import { Pagination } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import { PaginationWithCompanyDto } from "../../shared/dto/pagination-query-company";
import { PermissionTypeEnum } from "../../shared/enum/PermissionTypeEnum";
import { UserTypeEnum } from "../../shared/enum/UserTypeEnum.enum";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { GraphService } from "../../shared/msgraph/graph.service";
import { Company } from "../companies/entities/company.entity";
import { CompanyLanguage } from "../companylanguages/entities/companylanguage.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
export declare class UsersService {
    private readonly usersRepository;
    private readonly companiesRepository;
    private readonly companyLanguageRepository;
    private readonly graphService;
    constructor(usersRepository: Repository<User>, companiesRepository: Repository<Company>, companyLanguageRepository: Repository<CompanyLanguage>, graphService: GraphService);
    findAll(graphUser: GraphUserDto, query: PaginationWithCompanyDto): Promise<Pagination<User>>;
    update(uuid: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(uuid: string): Promise<import("typeorm").UpdateResult>;
    self(user: GraphUserDto): Promise<User>;
    findOrCreateUserFromMSGraph(user: GraphUserDto): Promise<User>;
    getAllDataType(): {
        UserTypeEnum: typeof UserTypeEnum;
        PermissionTypeEnum: typeof PermissionTypeEnum;
    };
}
