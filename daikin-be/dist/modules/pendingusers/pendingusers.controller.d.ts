import { Pagination } from "nestjs-typeorm-paginate";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { CreatePendingUserDto } from "./dto/create-pendinguser.dto";
import { UpdatePendingUserDto } from "./dto/update-pendinguser.dto";
import { PendingUser } from "./entities/pendinguser.entity";
import { PendingUsersService } from "./pendingusers.service";
export declare class PendingUsersController {
    private readonly pendingUsersService;
    constructor(pendingUsersService: PendingUsersService);
    create(user: GraphUserDto, createPendingUserDto: CreatePendingUserDto): Promise<PendingUser>;
    findAll(query?: PaginationDto): Promise<Pagination<PendingUser>>;
    update(user: GraphUserDto, id: number, updatePendingUserDto: UpdatePendingUserDto): Promise<import("typeorm").UpdateResult>;
}
