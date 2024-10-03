import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { CompaniesService } from "./companies.service";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./entities/company.entity";
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    dropdown(graphUser: GraphUserDto): Promise<Company[]>;
    update(code: string, updateCompanyDto: UpdateCompanyDto): Promise<import("typeorm").UpdateResult>;
    remove(code: string): Promise<import("typeorm").DeleteResult>;
}
