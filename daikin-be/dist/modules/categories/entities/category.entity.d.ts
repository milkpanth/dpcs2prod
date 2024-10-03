import { DataStateWithBaseEntity } from "../../../shared/entities/base";
import { Section } from "../../sections/entities/section.entity";
export declare class Category extends DataStateWithBaseEntity {
    CategoryID?: number;
    Name: string;
    SameName: boolean;
    AlwaysDisplay: boolean;
    CompanyCode?: string;
    Sections?: Section[];
    SectionsID?: Section[];
}
