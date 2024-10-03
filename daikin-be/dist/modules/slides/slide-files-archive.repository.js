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
exports.SlideFilesArchiveRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const app_logger_1 = require("../../shared/app-logger");
const db_1 = require("../../shared/constants/db");
const database_type_enum_1 = require("../../shared/enum/database-type.enum");
const slidefiles_archive_entity_1 = require("../slidefiles/entities/slidefiles_archive.entity");
let SlideFilesArchiveRepository = class SlideFilesArchiveRepository {
    constructor(useSlideRepo, liveSlideRepo, logger) {
        this.useSlideRepo = useSlideRepo;
        this.liveSlideRepo = liveSlideRepo;
        this.logger = logger;
        this.logger.setContext("SlideFilesArchiveRepository");
    }
    async getLastedVersion(slideId, language, databaseType) {
        this.logger.log(`getLastedVersion --> DB`, {
            slideId: slideId,
            language: language,
            databaseType: databaseType,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSlideRepo;
        }
        else {
            repo = this.liveSlideRepo;
        }
        const result = await repo.findOne({
            where: {
                SlideID: slideId,
                Language: language,
            },
            order: { Version: "DESC" },
        });
        this.logger.log(`DB --> getLastedVersion`, JSON.stringify(result));
        return result;
    }
    async findOneWithWhereConditions(whereConditions, databaseType, relations) {
        this.logger.log(`findOneWithWhereConditions --> DB`, {
            whereConditions: whereConditions,
            databaseType: databaseType,
            relations: relations,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSlideRepo;
        }
        else {
            repo = this.liveSlideRepo;
        }
        const result = await repo.findOne({
            relations: relations,
            where: whereConditions,
        });
        this.logger.log(`DB --> findOneWithWhereConditions`, JSON.stringify(result));
        return result;
    }
    async deleteByFileId(fileId, databaseType) {
        this.logger.log(`deleteByFileId --> DB`, {
            fileId: fileId,
            databaseType: databaseType,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSlideRepo;
        }
        else {
            repo = this.liveSlideRepo;
        }
        const result = await repo
            .createQueryBuilder()
            .delete()
            .where("FileID = :fileId", { fileId: fileId })
            .execute();
        this.logger.log(`DB --> deleteByFileId`, JSON.stringify(result));
        return result;
    }
    async deleteBySlideId(slideId, databaseType) {
        this.logger.log(`deleteBySlideId --> DB`, {
            slideId: slideId,
            databaseType: databaseType,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSlideRepo;
        }
        else {
            repo = this.liveSlideRepo;
        }
        const result = await repo
            .createQueryBuilder()
            .delete()
            .where("SlideID = :slideId", { slideId: slideId })
            .execute();
        this.logger.log(`DB --> deleteBySlideId`, JSON.stringify(result));
        return result;
    }
    async deleteSlideLessVersion(slideId, version, databaseType) {
        this.logger.log(`deleteSlideLessVersion --> DB`, {
            slideId: slideId,
            version: version,
            databaseType: databaseType,
        });
        let repo;
        if (databaseType === database_type_enum_1.DataBaseTypeEnum.USE) {
            repo = this.useSlideRepo;
        }
        else {
            repo = this.liveSlideRepo;
        }
        const result = await repo
            .createQueryBuilder()
            .delete()
            .where("SlideID = :slideId", { slideId: slideId })
            .andWhere("Version < :version", { version: version })
            .execute();
        this.logger.log(`DB --> deleteSlideLessVersion`, JSON.stringify(result));
        return result;
    }
};
SlideFilesArchiveRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(slidefiles_archive_entity_1.SlideFileArchive, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(slidefiles_archive_entity_1.SlideFileArchive, db_1.LIVE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        app_logger_1.AppLoggerService])
], SlideFilesArchiveRepository);
exports.SlideFilesArchiveRepository = SlideFilesArchiveRepository;
//# sourceMappingURL=slide-files-archive.repository.js.map