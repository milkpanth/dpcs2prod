import { Repository } from "typeorm";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./entities/company.entity";
export declare class CompaniesService {
    private readonly companiesRepository;
    constructor(companiesRepository: Repository<Company>);
    create(createCompanyDto: CreateCompanyDto): Promise<Company>;
    update(code: string, updateCompanyDto: UpdateCompanyDto): Promise<import("typeorm").UpdateResult>;
    remove(code: string): Promise<import("typeorm").DeleteResult>;
    dropdown(graphUser: GraphUserDto): Promise<Company[]>;
}
