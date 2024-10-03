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
exports.SectionTagsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const app_logger_1 = require("../../shared/app-logger");
const db_1 = require("../../shared/constants/db");
const database_type_enum_1 = require("../../shared/enum/database-type.enum");
const sectiontag_entity_1 = require("./entities/sectiontag.entity");
let SectionTagsRepository = class SectionTagsRepository {
    constructor(useSectionTagRepo, liveSectionTagRepo, logger) {
        this.useSectionTagRepo = useSectionTagRepo;
        this.liveSectionTagRepo = liveSectionTagRepo;
        this.logger = logger;
        this.logger.setContext("SectionTagsRepository");
    }
    async findOneWithWhereConditions(whereConditions, databaseType, relations) {
        this.logger.log(`findOneWithWhereConditions --> DB`, {
            whereConditions: whereConditions,
            databaseType: databaseType,
            relations: relations,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSectionTagRepo;
        }
        else {
            repo = this.liveSectionTagRepo;
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
            repo = this.useSectionTagRepo;
        }
        else {
            repo = this.liveSectionTagRepo;
        }
        const result = await repo.find({
            relations: relations,
            where: whereConditions,
        });
        this.logger.log(`DB --> findWithWhereConditions`, JSON.stringify(result));
        return result;
    }
};
SectionTagsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sectiontag_entity_1.SectionTag, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(sectiontag_entity_1.SectionTag, db_1.LIVE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        app_logger_1.AppLoggerService])
], SectionTagsRepository);
exports.SectionTagsRepository = SectionTagsRepository;
//# sourceMappingURL=section-tags.repository.js.map