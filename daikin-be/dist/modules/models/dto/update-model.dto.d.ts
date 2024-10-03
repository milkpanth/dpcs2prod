import { CreateModelDto } from "./create-model.dto";
export declare class UpdateModelDto extends CreateModelDto {
    NewName?: string;
    IsEOL: boolean;
}
