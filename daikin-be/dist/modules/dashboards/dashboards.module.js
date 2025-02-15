"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardsModule = void 0;
const common_1 = require("@nestjs/common");
const dashboards_service_1 = require("./dashboards.service");
const dashboards_controller_1 = require("./dashboards.controller");
const typeorm_1 = require("@nestjs/typeorm");
const db_1 = require("../../shared/constants/db");
const proposal_entity_1 = require("../proposals/entities/proposal.entity");
let DashboardsModule = class DashboardsModule {
};
DashboardsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([proposal_entity_1.Proposal], db_1.USE_DB_NAME)],
        controllers: [dashboards_controller_1.DashboardsController],
        providers: [dashboards_service_1.DashboardsService],
    })
], DashboardsModule);
exports.DashboardsModule = DashboardsModule;
//# sourceMappingURL=dashboards.module.js.map