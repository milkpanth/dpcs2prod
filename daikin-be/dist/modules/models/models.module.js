"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_logger_1 = require("../../shared/app-logger");
const db_1 = require("../../shared/constants/db");
const image_entity_1 = require("../images/entities/image.entity");
const images_module_1 = require("../images/images.module");
const images_repository_1 = require("../images/images.repository");
const series_entity_1 = require("../series/entities/series.entity");
const series_repository_1 = require("../series/series.repository");
const model_entity_1 = require("./entities/model.entity");
const model_repository_1 = require("./model.repository");
const models_controller_1 = require("./models.controller");
const models_service_1 = require("./models.service");
let ModelsModule = class ModelsModule {
};
ModelsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_logger_1.AppLoggerModule,
            typeorm_1.TypeOrmModule.forFeature([model_entity_1.Model, image_entity_1.Image, series_entity_1.Series], db_1.USE_DB_NAME),
            typeorm_1.TypeOrmModule.forFeature([model_entity_1.Model, image_entity_1.Image, series_entity_1.Series], db_1.LIVE_DB_NAME),
            images_module_1.ImagesModule,
        ],
        controllers: [models_controller_1.ModelsController],
        providers: [
            models_service_1.ModelsService,
            model_repository_1.ModelRepository,
            images_repository_1.ImagesRepository,
            series_repository_1.SeriesRepository,
        ],
    })
], ModelsModule);
exports.ModelsModule = ModelsModule;
//# sourceMappingURL=models.module.js.map