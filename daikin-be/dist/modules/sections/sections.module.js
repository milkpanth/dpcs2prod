"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_logger_1 = require("../../shared/app-logger");
const db_1 = require("../../shared/constants/db");
const categories_repository_1 = require("../categories/categories.repository");
const category_entity_1 = require("../categories/entities/category.entity");
const company_entity_1 = require("../companies/entities/company.entity");
const slide_entity_1 = require("../slides/entities/slide.entity");
const tags_module_1 = require("../tags/tags.module");
const section_entity_1 = require("./entities/section.entity");
const sections_controller_1 = require("./sections.controller");
const sections_repository_1 = require("./sections.repository");
const sections_service_1 = require("./sections.service");
let SectionsModule = class SectionsModule {
};
SectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_logger_1.AppLoggerModule,
            typeorm_1.TypeOrmModule.forFeature([section_entity_1.Section, slide_entity_1.Slide, category_entity_1.Category, company_entity_1.Company], db_1.USE_DB_NAME),
            typeorm_1.TypeOrmModule.forFeature([section_entity_1.Section, slide_entity_1.Slide, category_entity_1.Category, company_entity_1.Company], db_1.LIVE_DB_NAME),
            tags_module_1.TagsModule,
        ],
        controllers: [sections_controller_1.SectionsController],
        providers: [sections_service_1.SectionsService, sections_repository_1.SectionsRepository, categories_repository_1.CategoriesRepository],
    })
], SectionsModule);
exports.SectionsModule = SectionsModule;
//# sourceMappingURL=sections.module.js.map