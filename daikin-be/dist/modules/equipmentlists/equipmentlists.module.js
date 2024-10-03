"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentListsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const db_1 = require("../../shared/constants/db");
const model_entity_1 = require("../models/entities/model.entity");
const slidefile_entity_1 = require("../slidefiles/entities/slidefile.entity");
const equipmentlists_controller_1 = require("./equipmentlists.controller");
const equipmentlists_service_1 = require("./equipmentlists.service");
let EquipmentListsModule = class EquipmentListsModule {
};
EquipmentListsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([slidefile_entity_1.SlideFile, model_entity_1.Model], db_1.LIVE_DB_NAME)],
        controllers: [equipmentlists_controller_1.EquipmentListsController],
        providers: [equipmentlists_service_1.EquipmentListsService],
    })
], EquipmentListsModule);
exports.EquipmentListsModule = EquipmentListsModule;
//# sourceMappingURL=equipmentlists.module.js.map