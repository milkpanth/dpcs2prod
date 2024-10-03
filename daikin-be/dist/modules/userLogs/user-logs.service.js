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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogsService = void 0;
const common_1 = require("@nestjs/common");
const helpers_1 = require("../../common/helpers");
const app_logger_1 = require("../../shared/app-logger");
const database_type_enum_1 = require("../../shared/enum/database-type.enum");
const user_logs_repository_1 = require("./user-logs.repository");
let UserLogsService = class UserLogsService {
    constructor(userLogsRepo, logger) {
        this.userLogsRepo = userLogsRepo;
        this.logger = logger;
        this.logger.setContext("UserLogsService");
    }
    async createBulk(request, user, createUserLogList) {
        const result = [];
        for (const createUserLog of createUserLogList) {
            try {
                const created = await this.userLogsRepo.insertOrUpsert({
                    UserMemberID: user.oid,
                    IPAddress: (0, helpers_1.getIpFromRequest)(request),
                    Function: createUserLog.FunctionType,
                    Detail: createUserLog.Detail,
                }, database_type_enum_1.DataBaseTypeEnum.USE);
                result.push(created);
            }
            catch (err) {
                this.logger.error(err);
                continue;
            }
        }
        return result;
    }
};
UserLogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_logs_repository_1.UserLogsRepository,
        app_logger_1.AppLoggerService])
], UserLogsService);
exports.UserLogsService = UserLogsService;
//# sourceMappingURL=user-logs.service.js.map