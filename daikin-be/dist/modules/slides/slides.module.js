"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlidesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_logger_1 = require("../../shared/app-logger");
const cloudconvert_module_1 = require("../../shared/cloudconvert/cloudconvert.module");
const db_1 = require("../../shared/constants/db");
const company_entity_1 = require("../companies/entities/company.entity");
const section_entity_1 = require("../sections/entities/section.entity");
const slidefile_entity_1 = require("../slidefiles/entities/slidefile.entity");
const slidefiles_archive_entity_1 = require("../slidefiles/entities/slidefiles_archive.entity");
const tag_entity_1 = require("../tags/entities/tag.entity");
const tags_module_1 = require("../tags/tags.module");
const slide_entity_1 = require("./entities/slide.entity");
const slide_files_archive_repository_1 = require("./slide-files-archive.repository");
const slide_files_repository_1 = require("./slide-files.repository");
const slides_controller_1 = require("./slides.controller");
const slides_repository_1 = require("./slides.repository");
const slides_service_1 = require("./slides.service");
let SlidesModule = class SlidesModule {
};
SlidesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_logger_1.AppLoggerModule,
            typeorm_1.TypeOrmModule.forFeature([slide_entity_1.Slide, tag_entity_1.Tag, slidefile_entity_1.SlideFile, slidefiles_archive_entity_1.SlideFileArchive, section_entity_1.Section, company_entity_1.Company], db_1.USE_DB_NAME),
            typeorm_1.TypeOrmModule.forFeature([slide_entity_1.Slide, tag_entity_1.Tag, slidefile_entity_1.SlideFile, slidefiles_archive_entity_1.SlideFileArchive, section_entity_1.Section, company_entity_1.Company], db_1.LIVE_DB_NAME),
            cloudconvert_module_1.CloudConvertModule,
            tags_module_1.TagsModule,
        ],
        controllers: [slides_controller_1.SlidesController],
        providers: [
            slides_service_1.SlidesService,
            slides_repository_1.SlidesRepository,
            slide_files_repository_1.SlideFilesRepository,
            slide_files_archive_repository_1.SlideFilesArchiveRepository,
        ],
    })
], SlidesModule);
exports.SlidesModule = SlidesModule;
//# sourceMappingURL=slides.module.js.map