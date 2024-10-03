import { BaseEntity } from "../../../shared/entities/base";
export declare class Company extends BaseEntity {
    CompanyCode: string;
    Name: string;
    Prefix?: string;
    Abbreviation?: string;
}
