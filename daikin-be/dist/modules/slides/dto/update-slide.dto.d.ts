import { CreateSlideDto } from "./create-slide.dto";
export declare class UpdateSlideDto extends CreateSlideDto {
    SlideID: number;
    NewFileName?: string;
    IsEOL: boolean;
    DeletedSlideFiles: Number[];
}
