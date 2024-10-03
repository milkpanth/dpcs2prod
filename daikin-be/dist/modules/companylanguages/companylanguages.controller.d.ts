import { CompanyDto } from "../../shared/dto/company-query.dto";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { CompanyLanguagesService } from "./companylanguages.service";
import { CompanyLanguage } from "./entities/companylanguage.entity";
export declare class CompanyLanguagesController {
    private readonly companyLanguagesService;
    constructor(companyLanguagesService: CompanyLanguagesService);
    list(graphUser: GraphUserDto, companyDto: CompanyDto): Promise<CompanyLanguage[]>;
}
