import { DataStateWithBaseEntity } from "../../../shared/entities/base";
import { Model } from "../../models/entities/model.entity";
import { Tag } from "../../tags/entities/tag.entity";
export declare class Series extends DataStateWithBaseEntity {
    Name: string;
    SeriesType: number;
    Models: Model[];
    Tag: Tag;
}
