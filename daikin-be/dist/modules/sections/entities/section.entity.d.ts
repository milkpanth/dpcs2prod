import { DataStateWithBaseEntity } from "../../../shared/entities/base";
import { Category } from "../../categories/entities/category.entity";
import { SlideFile } from "../../slidefiles/entities/slidefile.entity";
import { Slide } from "../../slides/entities/slide.entity";
import { Tag } from "../../tags/entities/tag.entity";
export declare class Section extends DataStateWithBaseEntity {
    SectionID?: number;
    Name: string;
    AlwaysDisplay: boolean;
    SameName: boolean;
    CompanyCode?: string;
    CategoryID?: number;
    Category?: Category;
    Slides?: Slide[];
    Tags?: Tag[];
    SlideFiles?: SlideFile[];
}
