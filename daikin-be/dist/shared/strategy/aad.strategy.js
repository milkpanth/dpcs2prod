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
exports.AzureADStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const passport_azure_ad_1 = require("passport-azure-ad");
const users_service_1 = require("../../modules/users/users.service");
let AzureADStrategy = class AzureADStrategy extends (0, passport_1.PassportStrategy)(passport_azure_ad_1.BearerStrategy, "AzureAD") {
    constructor(configService, usersService) {
        super({
            clientID: configService.get("AZURE_CLIENT_ID"),
            audience: configService.get("AZURE_CLIENT_ID"),
            issuer: `https://login.microsoftonline.com/${configService.get("AZURE_TENANT_ID")}/v2.0`,
            identityMetadata: `https://login.microsoftonline.com/${configService.get("AZURE_TENANT_ID")}/v2.0/.well-known/openid-configuration`,
            ignoreExpiration: true,
            scope: ["user_impersonation"],
            validateIssuer: true,
            passReqToCallback: false,
            loggingLevel: configService.get("AZURE_AD_LOGGING_TYPE"),
            loggingNoPII: true,
        });
        this.configService = configService;
        this.usersService = usersService;
    }
    async validate(payload) {
        payload.user = await this.usersService.findOrCreateUserFromMSGraph(payload);
        return payload;
    }
};
AzureADStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService])
], AzureADStrategy);
exports.AzureADStrategy = AzureADStrategy;
//# sourceMappingURL=aad.strategy.js.map