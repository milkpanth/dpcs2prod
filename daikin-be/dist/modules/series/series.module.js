"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_logger_1 = require("../../shared/app-logger");
const db_1 = require("../../shared/constants/db");
const model_entity_1 = require("../models/entities/model.entity");
const model_repository_1 = require("../models/model.repository");
const tags_module_1 = require("../tags/tags.module");
const series_entity_1 = require("./entities/series.entity");
const series_controller_1 = require("./series.controller");
const series_repository_1 = require("./series.repository");
const series_service_1 = require("./series.service");
let SeriesModule = class SeriesModule {
};
SeriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_logger_1.AppLoggerModule,
            typeorm_1.TypeOrmModule.forFeature([series_entity_1.Series, model_entity_1.Model], db_1.USE_DB_NAME),
            typeorm_1.TypeOrmModule.forFeature([series_entity_1.Series, model_entity_1.Model], db_1.LIVE_DB_NAME),
            tags_module_1.TagsModule,
        ],
        controllers: [series_controller_1.SeriesController],
        providers: [series_service_1.SeriesService, series_repository_1.SeriesRepository, model_repository_1.ModelRepository],
    })
], SeriesModule);
exports.SeriesModule = SeriesModule;
//# sourceMappingURL=series.module.js.map