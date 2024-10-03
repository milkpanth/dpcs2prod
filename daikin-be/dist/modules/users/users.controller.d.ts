import { Pagination } from "nestjs-typeorm-paginate";
import { PaginationWithCompanyDto } from "../../shared/dto/pagination-query-company";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(user: GraphUserDto, query?: PaginationWithCompanyDto): Promise<Pagination<User>>;
    self(user: GraphUserDto): Promise<User>;
    datatype(): Promise<any>;
    update(uuid: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(uuid: string): Promise<import("typeorm").UpdateResult>;
}
