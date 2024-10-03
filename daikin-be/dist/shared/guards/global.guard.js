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
exports.GlobalGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const auth_1 = require("../constants/auth");
let GlobalGuard = class GlobalGuard extends (0, passport_1.AuthGuard)("AzureAD") {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    async canActivate(context) {
        const skipAuth = this.reflector.get(auth_1.ALLOW_UNAUTHORIZED_KEY, context.getHandler());
        if (skipAuth) {
            return true;
        }
        const baseResult = await super.canActivate(context);
        if (!baseResult) {
            return false;
        }
        const { user } = context.switchToHttp().getRequest();
        const { user: userProperty } = user;
        if (!userProperty.UserMemberStatus) {
            return false;
        }
        return true;
    }
};
GlobalGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], GlobalGuard);
exports.GlobalGuard = GlobalGuard;
//# sourceMappingURL=global.guard.js.map