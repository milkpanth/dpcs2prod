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
exports.DashboardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const db_1 = require("../../shared/constants/db");
const typeorm_2 = require("@nestjs/typeorm");
const proposal_entity_1 = require("../proposals/entities/proposal.entity");
const user_entity_1 = require("../users/entities/user.entity");
const UserTypeEnum_enum_1 = require("../../shared/enum/UserTypeEnum.enum");
const proposal_type_enum_1 = require("../proposals/entities/proposal-type.enum");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let DashboardsService = class DashboardsService {
    constructor(proposalsRepository) {
        this.proposalsRepository = proposalsRepository;
    }
    async dashboardTable(graphUser, dashboardQueryDto) {
        var _a, _b;
        const { name, type, startDate, endDate, company, page, limit, order, direction, } = dashboardQueryDto;
        const qbTable = this.proposalsRepository
            .createQueryBuilder("proposals")
            .select(`SUM(proposals.Type = "${proposal_type_enum_1.ProposalTypeEnum.APPLICATION}")`, "ATotal")
            .addSelect(`SUM(proposals.Type = "${proposal_type_enum_1.ProposalTypeEnum.PROPOSAL}")`, "PTotal")
            .leftJoin(user_entity_1.User, "users", "proposals.CreatedBy = users.UserMemberID")
            .addSelect("users.UserMemberID", "UserID")
            .addSelect("users.UserMemberName", "UserMemberName")
            .addSelect("users.UserMemberSurname", "UserMemberSurname")
            .addSelect("users.UserMemberEmail", "UserMemberEmail")
            .addSelect("users.CompanyCode", "UserCompanyCode")
            .groupBy("users.UserMemberID");
        if (name) {
            qbTable.orWhere("users.UserMemberName LIKE :name OR users.UserMemberSurname LIKE :name", {
                name: `%${name.trim()}%`,
            });
        }
        if (type) {
            qbTable.andWhere("proposals.Type = :matchType", {
                matchType: type,
            });
        }
        if ([UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN, UserTypeEnum_enum_1.UserTypeEnum.SUPERADMIN].includes((_a = graphUser.user) === null || _a === void 0 ? void 0 : _a.Type)) {
            if (company) {
                qbTable.andWhere("users.CompanyCode = :companyCode", {
                    companyCode: company,
                });
            }
        }
        else {
            qbTable.andWhere("users.CompanyCode = :companyCode", {
                companyCode: (_b = graphUser.user) === null || _b === void 0 ? void 0 : _b.CompanyCode,
            });
        }
        if (startDate) {
            qbTable.andWhere("proposals.CreatedDate >= :start", {
                start: `${startDate} 00:00:00`,
            });
        }
        if (endDate) {
            qbTable.andWhere("proposals.CreatedDate <= :end", {
                end: `${endDate} 23:59:59`,
            });
        }
        if (order && direction) {
            qbTable.orderBy(order, direction);
        }
        return (0, nestjs_typeorm_paginate_1.paginateRaw)(qbTable, { page, limit });
    }
    async dashboardChart(graphUser, dashboardQueryDto) {
        var _a, _b;
        const { name, type, startDate, endDate, company } = dashboardQueryDto;
        const qbChart = this.proposalsRepository
            .createQueryBuilder("proposals")
            .select(`SUM(proposals.Type = "${proposal_type_enum_1.ProposalTypeEnum.APPLICATION}")`, "ATotal")
            .addSelect(`SUM(proposals.Type = "${proposal_type_enum_1.ProposalTypeEnum.PROPOSAL}")`, "PTotal")
            .addSelect("DATE_FORMAT(proposals.CreatedDate, '%m-%Y')", "MonthYear")
            .leftJoin(user_entity_1.User, "users", "proposals.CreatedBy = users.UserMemberID")
            .groupBy("MonthYear")
            .orderBy("MonthYear", "ASC");
        if (name) {
            qbChart.orWhere("users.UserMemberName LIKE :name OR users.UserMemberSurname LIKE :name", {
                name: `%${name.trim()}%`,
            });
        }
        if (type) {
            qbChart.andWhere("proposals.Type = :matchType", {
                matchType: type,
            });
        }
        if ([UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN, UserTypeEnum_enum_1.UserTypeEnum.SUPERADMIN].includes((_a = graphUser.user) === null || _a === void 0 ? void 0 : _a.Type)) {
            if (company) {
                qbChart.andWhere("users.CompanyCode = :companyCode", {
                    companyCode: company,
                });
            }
        }
        else {
            qbChart.andWhere("users.CompanyCode = :companyCode", {
                companyCode: (_b = graphUser.user) === null || _b === void 0 ? void 0 : _b.CompanyCode,
            });
        }
        if (startDate) {
            qbChart.andWhere("proposals.CreatedDate >= :start", {
                start: `${startDate} 00:00:00`,
            });
        }
        if (endDate) {
            qbChart.andWhere("proposals.CreatedDate <= :end", {
                end: `${endDate} 23:59:59`,
            });
        }
        return qbChart.getRawMany();
    }
};
DashboardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(proposal_entity_1.Proposal, db_1.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], DashboardsService);
exports.DashboardsService = DashboardsService;
//# sourceMappingURL=dashboards.service.js.map