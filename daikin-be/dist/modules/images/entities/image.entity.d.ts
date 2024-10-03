import { DataStateWithBaseEntity } from "../../../shared/entities/base";
import { Model } from "../../models/entities/model.entity";
export declare class Image extends DataStateWithBaseEntity {
    ImageID: number;
    Name: string;
    File?: string;
    Models: Model[];
    UseCount: number;
}
