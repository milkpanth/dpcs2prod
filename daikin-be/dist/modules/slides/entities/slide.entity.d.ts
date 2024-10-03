import { DataStateWithBaseEntity } from "../../../shared/entities/base";
import { Company } from "../../companies/entities/company.entity";
import { Section } from "../../sections/entities/section.entity";
import { SlideFile } from "../../slidefiles/entities/slidefile.entity";
import { SlideFileArchive } from "../../slidefiles/entities/slidefiles_archive.entity";
import { Tag } from "../../tags/entities/tag.entity";
export declare class Slide extends DataStateWithBaseEntity {
    SlideID: number;
    FileName: string;
    DisplayName: string;
    CompanyCode?: string;
    SectionID: number;
    Section: Section;
    SlideFiles: SlideFile[];
    SlideFileArchives: SlideFileArchive[];
    Tags: Tag[];
    Company: Company;
}
