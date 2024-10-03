import { DataSource } from "typeorm";
import { Bookmark } from "./entities/bookmark.entity";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
export declare class BookmarksService {
    private dataSource;
    constructor(dataSource: DataSource);
    toggle(graphUser: GraphUserDto, fileId: number): Promise<import("typeorm").DeleteResult | ({
        UserMemberID: string;
        FileID: number;
    } & Bookmark)>;
    findAll(graphUser: GraphUserDto): Promise<Bookmark[]>;
}
