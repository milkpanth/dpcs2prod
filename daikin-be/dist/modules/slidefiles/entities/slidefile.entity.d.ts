import { Like } from "../../likes/entities/like.entity";
import { Slide } from "../../slides/entities/slide.entity";
export declare class SlideFile {
    FileID: number;
    SlideID: number;
    Language: string;
    Path: string;
    Version: number;
    SlideTotalPage: number;
    Slide: Slide;
    Likes: Like[];
    CreatedBy: string;
    CreatedDate: Date;
}
