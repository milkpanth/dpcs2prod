import { FindOperator } from "typeorm";
import { Company } from "../modules/companies/entities/company.entity";
import { User } from "../modules/users/entities/user.entity";
export declare const companyWhereFilter: (user: User, optional?: FindOperator<string> | string) => {
    CompanyCode: string | FindOperator<string>;
} | {
    CompanyCode?: undefined;
};
export declare const filterCompanyList: (companyList: Array<Company>, excludeCompany?: string) => Company[];
export declare const appendGlobalCompany: (companyList: Array<Company>) => number;
