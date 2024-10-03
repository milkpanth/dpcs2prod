"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionActionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const db_1 = require("../../shared/constants/db");
const permission_action_entity_1 = require("./entities/permission_action.entity");
let PermissionActionsService = class PermissionActionsService {
    constructor(usePermissionActionsRepository) {
        this.usePermissionActionsRepository = usePermissionActionsRepository;
    }
    findAll() {
        return this.usePermissionActionsRepository.find({
            relations: {
                Users: true,
            },
        });
    }
    async update(updatePermissionDto) {
        return await Promise.all(updatePermissionDto.map((p) => this.usePermissionActionsRepository.update({
            ActionID: p.ActionID,
        }, {
            Read: p.Read,
            Modify: p.Modify,
            Delete: p.Delete,
        })));
    }
};
PermissionActionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_action_entity_1.PermissionAction, db_1.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionActionsService);
exports.PermissionActionsService = PermissionActionsService;
//# sourceMappingURL=permissionactions.service.js.map