import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { BookmarksService } from "./bookmarks.service";
import { Bookmark } from "./entities/bookmark.entity";
export declare class BookmarksController {
    private readonly bookmarksService;
    constructor(bookmarksService: BookmarksService);
    toggle(graphUser: GraphUserDto, fileId: number): Promise<import("typeorm").DeleteResult | ({
        UserMemberID: string;
        FileID: number;
    } & Bookmark)>;
    findAll(graphUser: GraphUserDto): Promise<Bookmark[]>;
}
