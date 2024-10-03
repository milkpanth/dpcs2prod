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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const db_1 = require("../../shared/constants/db");
const user_1 = require("../../shared/constants/user");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const PermissionTypeEnum_1 = require("../../shared/enum/PermissionTypeEnum");
const UserTypeEnum_enum_1 = require("../../shared/enum/UserTypeEnum.enum");
const graph_user_dto_1 = require("../../shared/msgraph/dto/graph-user.dto");
const graph_service_1 = require("../../shared/msgraph/graph.service");
const company_helper_1 = require("../../utils/company-helper");
const entity_helper_1 = require("../../utils/entity-helper");
const pagination_1 = require("../../utils/pagination");
const company_entity_1 = require("../companies/entities/company.entity");
const companylanguage_entity_1 = require("../companylanguages/entities/companylanguage.entity");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository, companiesRepository, companyLanguageRepository, graphService) {
        this.usersRepository = usersRepository;
        this.companiesRepository = companiesRepository;
        this.companyLanguageRepository = companyLanguageRepository;
        this.graphService = graphService;
    }
    async findAll(graphUser, query) {
        return (0, nestjs_typeorm_paginate_1.paginate)(this.usersRepository, (0, pagination_1.getBasePaginationOption)(query), {
            where: (0, pagination_1.getBaseWhereOption)(query, [
                Object.assign({ UserMemberEmail: (0, typeorm_2.Like)(`%${(0, entity_helper_1.escapeLikeString)(query.keyword)}%`) }, (0, company_helper_1.companyWhereFilter)(graphUser.user, query.company)),
                Object.assign({ UserMemberName: (0, typeorm_2.Like)(`%${(0, entity_helper_1.escapeLikeString)(query.keyword)}%`) }, (0, company_helper_1.companyWhereFilter)(graphUser.user, query.company)),
                Object.assign({ UserMemberSurname: (0, typeorm_2.Like)(`%${(0, entity_helper_1.escapeLikeString)(query.keyword)}%`) }, (0, company_helper_1.companyWhereFilter)(graphUser.user, query.company)),
            ], Object.assign({}, (0, company_helper_1.companyWhereFilter)(graphUser.user, query.company))),
            order: (0, pagination_1.getBaseOrderingOption)(query),
        });
    }
    update(uuid, updateUserDto) {
        return this.usersRepository.update({
            UserMemberID: uuid,
        }, Object.assign({}, updateUserDto));
    }
    remove(uuid) {
        return this.usersRepository.update({
            UserMemberID: uuid,
        }, {
            UserMemberStatus: false,
        });
    }
    async self(user) {
        const { oid } = user;
        return this.usersRepository.findOne({
            relations: {
                Company: true,
                PermissionActions: true,
            },
            where: { UserMemberID: oid },
        });
    }
    async findOrCreateUserFromMSGraph(user) {
        const { oid } = user;
        const existUser = await this.usersRepository.findOneBy({
            UserMemberID: oid,
        });
        if (existUser) {
            return existUser;
        }
        else {
            const { extension_25df96e0112c41428645a90445fd9e69_CompanyCode, extension_25df96e0112c41428645a90445fd9e69_CompanyAbbr, companyName, givenName, surname, mail, jobTitle, usageLocation, } = await this.graphService.getUserFromGraph(oid);
            const CompanyCode = extension_25df96e0112c41428645a90445fd9e69_CompanyCode ||
                user_1.MS_GRAPH_DEFAULT_COMPANY_CODE;
            const CompanyAbbreviation = extension_25df96e0112c41428645a90445fd9e69_CompanyAbbr ||
                user_1.MS_GRAPH_DEFAULT_COMPANY_ABBR;
            const CompanyName = companyName || user_1.MS_GRAPH_DEFAULT_COMPANY_NAME;
            const shouldCreateCompany = extension_25df96e0112c41428645a90445fd9e69_CompanyCode &&
                extension_25df96e0112c41428645a90445fd9e69_CompanyAbbr &&
                companyName;
            if (shouldCreateCompany) {
                await this.companiesRepository.upsert({
                    CompanyCode: CompanyCode,
                    Abbreviation: CompanyAbbreviation,
                    Name: CompanyName,
                }, ["CompanyCode"]);
                await this.companyLanguageRepository.upsert({
                    CompanyCode: CompanyCode,
                    Language: "EN",
                }, ["CompanyCode", "Language"]);
            }
            return this.usersRepository.save({
                UserMemberID: oid,
                CompanyCode: shouldCreateCompany
                    ? CompanyCode
                    : user_1.MS_GRAPH_DEFAULT_COMPANY_CODE,
                UserMemberName: givenName,
                UserMemberSurname: surname,
                UserMemberEmail: mail,
                UserMemberStatus: true,
                Position: jobTitle,
                Country: usageLocation || user_1.MS_GRAPH_DEFAULT_USAGE_LOCATION,
                RecentLogin: new Date(),
                Type: UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN,
            });
        }
    }
    getAllDataType() {
        return {
            UserTypeEnum: UserTypeEnum_enum_1.UserTypeEnum,
            PermissionTypeEnum: PermissionTypeEnum_1.PermissionTypeEnum,
        };
    }
};
__decorate([
    __param(0, (0, auth_decorator_1.AuthDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graph_user_dto_1.GraphUserDto]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "self", null);
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(company_entity_1.Company, db_1.USE_DB_NAME)),
    __param(2, (0, typeorm_1.InjectRepository)(companylanguage_entity_1.CompanyLanguage, db_1.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        graph_service_1.GraphService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map