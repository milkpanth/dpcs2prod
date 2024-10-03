import { DataStateWithBaseEntity } from "../../../shared/entities/base";
import { Section } from "../../sections/entities/section.entity";
import { Slide } from "../../slides/entities/slide.entity";
export declare class Tag extends DataStateWithBaseEntity {
    TagID: number;
    Name: string;
    IsSeriesType: boolean;
    Slides: Slide[];
    Sections: Section[];
    UseCount: number;
}
