"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const db_1 = require("../../shared/constants/db");
const app_logger_module_1 = require("./../../shared/app-logger/app-logger.module");
const user_logs_entity_1 = require("./entities/user-logs.entity");
const user_logs_controller_1 = require("./user-logs.controller");
const user_logs_repository_1 = require("./user-logs.repository");
const user_logs_service_1 = require("./user-logs.service");
let UserLogsModule = class UserLogsModule {
};
UserLogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_logger_module_1.AppLoggerModule,
            typeorm_1.TypeOrmModule.forFeature([user_logs_entity_1.UserLogs], db_1.USE_DB_NAME),
            typeorm_1.TypeOrmModule.forFeature([user_logs_entity_1.UserLogs], db_1.LIVE_DB_NAME),
        ],
        controllers: [user_logs_controller_1.UserLogsController],
        providers: [user_logs_service_1.UserLogsService, user_logs_repository_1.UserLogsRepository],
        exports: [user_logs_service_1.UserLogsService, user_logs_service_1.UserLogsService],
    })
], UserLogsModule);
exports.UserLogsModule = UserLogsModule;
//# sourceMappingURL=user-logs.module.js.map