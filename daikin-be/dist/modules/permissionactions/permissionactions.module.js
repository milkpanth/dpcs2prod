"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionActionsModule = void 0;
const common_1 = require("@nestjs/common");
const permissionactions_service_1 = require("./permissionactions.service");
const permissionactions_controller_1 = require("./permissionactions.controller");
const typeorm_1 = require("@nestjs/typeorm");
const permission_action_entity_1 = require("./entities/permission_action.entity");
const db_1 = require("../../shared/constants/db");
let PermissionActionsModule = class PermissionActionsModule {
};
PermissionActionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([permission_action_entity_1.PermissionAction], db_1.USE_DB_NAME),
            typeorm_1.TypeOrmModule.forFeature([permission_action_entity_1.PermissionAction], db_1.LIVE_DB_NAME),
        ],
        controllers: [permissionactions_controller_1.PermissionActionsController],
        providers: [permissionactions_service_1.PermissionActionsService],
    })
], PermissionActionsModule);
exports.PermissionActionsModule = PermissionActionsModule;
//# sourceMappingURL=permissionactions.module.js.map