"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_logger_1 = require("../../shared/app-logger");
const db_1 = require("../../shared/constants/db");
const company_entity_1 = require("../companies/entities/company.entity");
const section_entity_1 = require("../sections/entities/section.entity");
const user_entity_1 = require("../users/entities/user.entity");
const sections_repository_1 = require("./../sections/sections.repository");
const categories_controller_1 = require("./categories.controller");
const categories_repository_1 = require("./categories.repository");
const categories_service_1 = require("./categories.service");
const category_entity_1 = require("./entities/category.entity");
let CategoriesModule = class CategoriesModule {
};
CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_logger_1.AppLoggerModule,
            typeorm_1.TypeOrmModule.forFeature([category_entity_1.Category, user_entity_1.User, company_entity_1.Company, section_entity_1.Section], db_1.USE_DB_NAME),
            typeorm_1.TypeOrmModule.forFeature([category_entity_1.Category, user_entity_1.User, company_entity_1.Company, section_entity_1.Section], db_1.LIVE_DB_NAME),
        ],
        controllers: [categories_controller_1.CategoriesController],
        providers: [categories_service_1.CategoriesService, categories_repository_1.CategoriesRepository, sections_repository_1.SectionsRepository],
    })
], CategoriesModule);
exports.CategoriesModule = CategoriesModule;
//# sourceMappingURL=categories.module.js.map