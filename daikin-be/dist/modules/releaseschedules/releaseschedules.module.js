"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReleaseScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const db_1 = require("../../shared/constants/db");
const datamanagements_module_1 = require("../datamanagements/datamanagements.module");
const releaseschedule_entity_1 = require("./entities/releaseschedule.entity");
const releaseschedules_controller_1 = require("./releaseschedules.controller");
const releaseschedules_service_1 = require("./releaseschedules.service");
let ReleaseScheduleModule = class ReleaseScheduleModule {
};
ReleaseScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([releaseschedule_entity_1.ReleaseSchedule], db_1.USE_DB_NAME),
            datamanagements_module_1.DataManagementsModule,
        ],
        controllers: [releaseschedules_controller_1.ReleaseScheduleController],
        providers: [releaseschedules_service_1.ReleaseScheduleService],
        exports: [releaseschedules_service_1.ReleaseScheduleService],
    })
], ReleaseScheduleModule);
exports.ReleaseScheduleModule = ReleaseScheduleModule;
//# sourceMappingURL=releaseschedules.module.js.map