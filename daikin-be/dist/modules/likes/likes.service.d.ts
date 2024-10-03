import { DataSource } from "typeorm";
import { Like } from "./entities/like.entity";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
export declare class LikesService {
    private dataSource;
    constructor(dataSource: DataSource);
    toggle(graphUser: GraphUserDto, fileId: number): Promise<import("typeorm").DeleteResult | ({
        UserMemberID: string;
        FileID: number;
    } & Like)>;
    findAll(graphUser: GraphUserDto): Promise<Like[]>;
}
