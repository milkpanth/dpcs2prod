import { Repository } from "typeorm";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { CompanyLanguage } from "./entities/companylanguage.entity";
import { CompanyDto } from "../../shared/dto/company-query.dto";
export declare class CompanyLanguagesService {
    private readonly companyLanguagesRepository;
    constructor(companyLanguagesRepository: Repository<CompanyLanguage>);
    list(graphUser: GraphUserDto, companyDto: CompanyDto): Promise<CompanyLanguage[]>;
}
