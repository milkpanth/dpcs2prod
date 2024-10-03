import { Category } from "../../../modules/categories/entities/category.entity";
import { Company } from "../../../modules/companies/entities/company.entity";
import { Image } from "../../../modules/images/entities/image.entity";
import { Model } from "../../../modules/models/entities/model.entity";
import { Section } from "../../../modules/sections/entities/section.entity";
import { Series } from "../../../modules/series/entities/series.entity";
import { Slide } from "../../../modules/slides/entities/slide.entity";
import { Tag } from "../../../modules/tags/entities/tag.entity";
export declare class ListReleaseToLiveResponseDto {
    series: Series[];
    models: Model[];
    categories: Category[];
    sections: Section[];
    slides: Slide[];
    tags: Tag[];
    images: Image[];
    companies?: Company[] | undefined;
}
