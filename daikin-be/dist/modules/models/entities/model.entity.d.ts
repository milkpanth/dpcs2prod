import { DataStateWithBaseEntity } from "../../../shared/entities/base";
import { Image } from "../../images/entities/image.entity";
import { Series } from "../../series/entities/series.entity";
export declare class Model extends DataStateWithBaseEntity {
    Name: string;
    SeriesName?: string;
    ImageID?: number;
    Series: Series;
    Image: Image;
}
