"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PendingUsersModule = void 0;
const common_1 = require("@nestjs/common");
const pendingusers_service_1 = require("./pendingusers.service");
const pendingusers_controller_1 = require("./pendingusers.controller");
const typeorm_1 = require("@nestjs/typeorm");
const pendinguser_entity_1 = require("./entities/pendinguser.entity");
const graph_module_1 = require("../../shared/msgraph/graph.module");
const company_entity_1 = require("../companies/entities/company.entity");
const user_entity_1 = require("../users/entities/user.entity");
const db_1 = require("../../shared/constants/db");
let PendingUsersModule = class PendingUsersModule {
};
PendingUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([pendinguser_entity_1.PendingUser, company_entity_1.Company, user_entity_1.User], db_1.USE_DB_NAME),
            graph_module_1.GraphModule,
        ],
        controllers: [pendingusers_controller_1.PendingUsersController],
        providers: [pendingusers_service_1.PendingUsersService],
        exports: [pendingusers_service_1.PendingUsersService],
    })
], PendingUsersModule);
exports.PendingUsersModule = PendingUsersModule;
//# sourceMappingURL=pendingusers.module.js.map