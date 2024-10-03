import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { Like } from "./entities/like.entity";
import { LikesService } from "./likes.service";
export declare class LikesController {
    private readonly likesService;
    constructor(likesService: LikesService);
    toggle(graphUser: GraphUserDto, fileId: number): Promise<import("typeorm").DeleteResult | ({
        UserMemberID: string;
        FileID: number;
    } & Like)>;
    findAll(graphUser: GraphUserDto): Promise<Like[]>;
}
