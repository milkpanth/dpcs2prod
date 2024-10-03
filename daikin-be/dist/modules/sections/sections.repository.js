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
exports.SectionsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const app_logger_1 = require("../../shared/app-logger");
const db_1 = require("../../shared/constants/db");
const enum_1 = require("../../shared/enum");
const database_type_enum_1 = require("../../shared/enum/database-type.enum");
const utils_1 = require("../../utils");
const company_helper_1 = require("../../utils/company-helper");
const entity_helper_1 = require("../../utils/entity-helper");
const pagination_1 = require("../../utils/pagination");
const sectiontag_entity_1 = require("../sectiontags/entities/sectiontag.entity");
const section_entity_1 = require("./entities/section.entity");
let SectionsRepository = class SectionsRepository {
    constructor(useSectionRepo, liveSectionRepo, logger) {
        this.useSectionRepo = useSectionRepo;
        this.liveSectionRepo = liveSectionRepo;
        this.logger = logger;
        this.logger.setContext("SectionsRepository");
    }
    async findOneWithWhereConditions(whereConditions, databaseType, relations) {
        this.logger.log(`findOneWithWhereConditions --> DB`, {
            whereConditions: whereConditions,
            databaseType: databaseType,
            relations: relations,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSectionRepo;
        }
        else {
            repo = this.liveSectionRepo;
        }
        const result = await repo.findOne({
            relations: relations,
            where: whereConditions,
        });
        this.logger.log(`DB --> findOneWithWhereConditions`, JSON.stringify(result));
        return result;
    }
    async findWithWhereConditions(whereConditions, databaseType, relations) {
        this.logger.log(`findWithWhereConditions --> DB`, {
            whereConditions: whereConditions,
            databaseType: databaseType,
            relations: relations,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSectionRepo;
        }
        else {
            repo = this.liveSectionRepo;
        }
        const result = await repo.find({
            relations: relations,
            where: whereConditions,
        });
        this.logger.log(`DB --> findWithWhereConditions`, JSON.stringify(result));
        return result;
    }
    async insertOrUpsert(section, databaseType) {
        this.logger.log(`insertOrUpsert --> DB`, {
            section: section,
            databaseType: databaseType,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSectionRepo;
        }
        else {
            repo = this.liveSectionRepo;
        }
        const result = await repo.save(section);
        this.logger.log(`DB --> insertOrUpsert`, JSON.stringify(result));
        return result;
    }
    async findAll(queryPayload, graphUser, databaseType) {
        this.logger.log(`findAll --> DB`, {
            queryPayload: queryPayload,
            databaseType: databaseType,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSectionRepo;
        }
        else {
            repo = this.liveSectionRepo;
        }
        let sectionID = [];
        if (queryPayload.tagIDs && queryPayload.tagIDs.length > 0) {
            const sectionTagsRepo = this.useSectionRepo.manager.getRepository(sectiontag_entity_1.SectionTag);
            const sectionTags = await sectionTagsRepo.find({
                where: {
                    TagID: (0, typeorm_2.In)(queryPayload.tagIDs),
                },
                select: {
                    SectionID: true,
                },
            });
            sectionID = sectionTags.map((sectionTag) => sectionTag.SectionID);
        }
        const result = await (0, nestjs_typeorm_paginate_1.paginate)(repo, (0, pagination_1.getBasePaginationOption)(queryPayload), {
            relations: {
                Tags: true,
                Category: true,
            },
            where: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (0, utils_1.getWhereConditionWithSameName)(queryPayload.SameName)), (0, company_helper_1.companyWhereFilter)(graphUser.user, queryPayload.company || (0, typeorm_2.IsNull)())), (0, pagination_1.getBaseWhereOption)(queryPayload, {
                Name: (0, typeorm_2.Like)(`%${(0, entity_helper_1.escapeLikeString)(queryPayload.keyword)}%`),
            })), (0, pagination_1.getBaseStatusOption)(queryPayload)), (sectionID.length > 0 ? { SectionID: (0, typeorm_2.In)(sectionID) } : {})),
            order: (0, pagination_1.getBaseOrderingOption)(queryPayload),
        });
        this.logger.log(`DB --> findAll`, JSON.stringify(result));
        return result;
    }
    async deleteByStatus(companyCode, status, databaseType) {
        this.logger.log(`deleteByStatus --> DB`, {
            companyCode: companyCode,
            status: status,
            databaseType: databaseType,
        });
        let repo;
        const compCode = !companyCode || companyCode === enum_1.CompanyCodeEnum.GLOBAL
            ? null
            : companyCode;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSectionRepo;
        }
        else {
            repo = this.liveSectionRepo;
        }
        const query = repo.createQueryBuilder("c").delete();
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            query.where("Use = :status", { status });
        }
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.LIVE) {
            query.where("Live = :status", { status });
        }
        query.andWhere("CompanyCode = :compCode", { compCode });
        const result = query.execute();
        this.logger.log(`DB --> deleteByStatus`, JSON.stringify(result));
        return result;
    }
    async deleteById(id, databaseType) {
        this.logger.log(`deleteById --> DB`, {
            id: id,
            databaseType: databaseType,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSectionRepo;
        }
        else {
            repo = this.liveSectionRepo;
        }
        const result = await repo
            .createQueryBuilder()
            .delete()
            .where("SectionID = :id", { id: id })
            .execute();
        this.logger.log(`DB --> deleteById`, JSON.stringify(result));
        return result;
    }
    async deleteByIds(ids, databaseType) {
        this.logger.log(`deleteByIds --> DB`, {
            ids: ids,
            databaseType: databaseType,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSectionRepo;
        }
        else {
            repo = this.liveSectionRepo;
        }
        const result = await repo.delete({ SectionID: (0, typeorm_2.In)(ids) });
        this.logger.log(`DB --> deleteByIds`, JSON.stringify(result));
        return result;
    }
};
SectionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(section_entity_1.Section, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(section_entity_1.Section, db_1.LIVE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        app_logger_1.AppLoggerService])
], SectionsRepository);
exports.SectionsRepository = SectionsRepository;
//# sourceMappingURL=sections.repository.js.map