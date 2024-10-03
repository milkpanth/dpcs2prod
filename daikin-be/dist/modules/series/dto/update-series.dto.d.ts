import { CreateSeriesDto } from "./create-series.dto";
export declare class UpdateSeriesDto extends CreateSeriesDto {
    NewName?: string;
    IsEOL: boolean;
}
