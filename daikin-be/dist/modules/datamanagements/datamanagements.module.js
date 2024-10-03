"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManagementsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_logger_1 = require("../../shared/app-logger");
const db_1 = require("../../shared/constants/db");
const category_entity_1 = require("../categories/entities/category.entity");
const company_entity_1 = require("../companies/entities/company.entity");
const release_schedules_entitie_1 = require("../datamanagements/entities/release_schedules.entitie");
const image_entity_1 = require("../images/entities/image.entity");
const model_entity_1 = require("../models/entities/model.entity");
const section_entity_1 = require("../sections/entities/section.entity");
const sections_repository_1 = require("../sections/sections.repository");
const series_entity_1 = require("../series/entities/series.entity");
const slidefile_entity_1 = require("../slidefiles/entities/slidefile.entity");
const slidefiles_archive_entity_1 = require("../slidefiles/entities/slidefiles_archive.entity");
const slide_entity_1 = require("../slides/entities/slide.entity");
const slidetag_entity_1 = require("../slidetags/entities/slidetag.entity");
const tag_entity_1 = require("../tags/entities/tag.entity");
const user_entity_1 = require("../users/entities/user.entity");
const datamanagements_controller_1 = require("./datamanagements.controller");
const datamanagements_service_1 = require("./datamanagements.service");
let DataManagementsModule = class DataManagementsModule {
};
DataManagementsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_logger_1.AppLoggerModule,
            typeorm_1.TypeOrmModule.forFeature([
                company_entity_1.Company,
                user_entity_1.User,
                image_entity_1.Image,
                tag_entity_1.Tag,
                slide_entity_1.Slide,
                slidefile_entity_1.SlideFile,
                slidetag_entity_1.SlideTag,
                section_entity_1.Section,
                category_entity_1.Category,
                series_entity_1.Series,
                model_entity_1.Model,
                release_schedules_entitie_1.ReleaseSchedules,
                slidefiles_archive_entity_1.SlideFileArchive,
            ], db_1.USE_DB_NAME),
            typeorm_1.TypeOrmModule.forFeature([
                company_entity_1.Company,
                user_entity_1.User,
                image_entity_1.Image,
                tag_entity_1.Tag,
                slide_entity_1.Slide,
                slidefile_entity_1.SlideFile,
                slidetag_entity_1.SlideTag,
                section_entity_1.Section,
                category_entity_1.Category,
                series_entity_1.Series,
                model_entity_1.Model,
                release_schedules_entitie_1.ReleaseSchedules,
                slidefiles_archive_entity_1.SlideFileArchive,
            ], db_1.LIVE_DB_NAME),
        ],
        controllers: [datamanagements_controller_1.DataManagementsController],
        providers: [datamanagements_service_1.DataManagementsService, sections_repository_1.SectionsRepository],
        exports: [datamanagements_service_1.DataManagementsService],
    })
], DataManagementsModule);
exports.DataManagementsModule = DataManagementsModule;
//# sourceMappingURL=datamanagements.module.js.map