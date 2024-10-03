"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const db_1 = require("../../shared/constants/db");
const UserTypeEnum_enum_1 = require("../../shared/enum/UserTypeEnum.enum");
const company_helper_1 = require("../../utils/company-helper");
const company_entity_1 = require("./entities/company.entity");
let CompaniesService = class CompaniesService {
    constructor(companiesRepository) {
        this.companiesRepository = companiesRepository;
    }
    create(createCompanyDto) {
        return this.companiesRepository.save(this.companiesRepository.create(createCompanyDto));
    }
    update(code, updateCompanyDto) {
        return this.companiesRepository.update({
            CompanyCode: code,
        }, Object.assign({}, updateCompanyDto));
    }
    remove(code) {
        return this.companiesRepository.delete({
            CompanyCode: code,
        });
    }
    async dropdown(graphUser) {
        const allCompany = await this.companiesRepository.findBy((0, company_helper_1.companyWhereFilter)(graphUser.user));
        if ([UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN, UserTypeEnum_enum_1.UserTypeEnum.SUPERADMIN].includes(graphUser.user.Type)) {
            allCompany.unshift(this.companiesRepository.create({
                CreatedBy: null,
                UpdatedBy: null,
                CreatedDate: null,
                UpdatedDate: null,
                DeletedDate: null,
                CompanyCode: null,
                Name: "Global",
                Prefix: null,
                Abbreviation: "Global",
            }));
        }
        return allCompany;
    }
};
CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company, db_1.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompaniesService);
exports.CompaniesService = CompaniesService;
//# sourceMappingURL=companies.service.js.map