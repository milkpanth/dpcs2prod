import { Pagination } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { GraphService } from "../../shared/msgraph/graph.service";
import { Company } from "../companies/entities/company.entity";
import { User } from "../users/entities/user.entity";
import { CreatePendingUserDto } from "./dto/create-pendinguser.dto";
import { UpdatePendingUserDto } from "./dto/update-pendinguser.dto";
import { PendingUser } from "./entities/pendinguser.entity";
export declare class PendingUsersService {
    private readonly pendingUsersRepository;
    private readonly usersRepository;
    private readonly companiesRepository;
    private readonly graphService;
    constructor(pendingUsersRepository: Repository<PendingUser>, usersRepository: Repository<User>, companiesRepository: Repository<Company>, graphService: GraphService);
    create(graphUser: GraphUserDto, createPendingUserDto: CreatePendingUserDto): Promise<PendingUser>;
    findAll(query: PaginationDto): Promise<Pagination<PendingUser>>;
    update(graphUser: GraphUserDto, pendingId: number, updatePendingUserDto: UpdatePendingUserDto): Promise<import("typeorm").UpdateResult>;
}
