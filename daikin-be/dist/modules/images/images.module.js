"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_logger_1 = require("../../shared/app-logger");
const db_1 = require("../../shared/constants/db");
const model_entity_1 = require("../models/entities/model.entity");
const model_repository_1 = require("./../models/model.repository");
const image_entity_1 = require("./entities/image.entity");
const images_controller_1 = require("./images.controller");
const images_repository_1 = require("./images.repository");
const images_service_1 = require("./images.service");
let ImagesModule = class ImagesModule {
};
ImagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_logger_1.AppLoggerModule,
            typeorm_1.TypeOrmModule.forFeature([image_entity_1.Image, model_entity_1.Model], db_1.USE_DB_NAME),
            typeorm_1.TypeOrmModule.forFeature([image_entity_1.Image, model_entity_1.Model], db_1.LIVE_DB_NAME),
        ],
        controllers: [images_controller_1.ImagesController],
        providers: [images_service_1.ImagesService, images_repository_1.ImagesRepository, model_repository_1.ModelRepository],
        exports: [images_service_1.ImagesService],
    })
], ImagesModule);
exports.ImagesModule = ImagesModule;
//# sourceMappingURL=images.module.js.map