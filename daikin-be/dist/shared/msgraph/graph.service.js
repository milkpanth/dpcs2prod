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
exports.GraphService = void 0;
const msal_node_1 = require("@azure/msal-node");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let GraphService = class GraphService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.SELECTED_ATTRIBUTE = [
            "givenName",
            "surname",
            "companyName",
            "extension_25df96e0112c41428645a90445fd9e69_CompanyCode",
            "extension_25df96e0112c41428645a90445fd9e69_CompanyAbbr",
            "jobTitle",
            "mail",
            "mobile",
            "accountEnabled",
        ];
        this.confidentialClientApplication = new msal_node_1.ConfidentialClientApplication({
            auth: {
                clientId: this.configService.get("AZURE_CLIENT_ID"),
                authority: "https://login.microsoftonline.com/" +
                    this.configService.get("AZURE_TENANT_ID"),
                clientSecret: this.configService.get("AZURE_CLIENT_SECRET"),
            },
        });
    }
    async listUser() {
        const accessToken = await this.getAccessToken();
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(`${process.env.MICROSOFT_GRAPH_URL}/users`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            var _a;
            console.error((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
            throw new Error("Error when communicate Microsoft Graph!");
        })));
        return data;
    }
    async getUserFromGraph(openID) {
        const accessToken = await this.getAccessToken();
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(`${process.env.MICROSOFT_GRAPH_URL}/users/${openID}?$select=${this.SELECTED_ATTRIBUTE.join(",")}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            var _a;
            console.error((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
            throw new Error("Error when communicate Microsoft Graph!");
        })));
        return data;
    }
    async inviteUser(email) {
        const accessToken = await this.getAccessToken();
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .post(`${process.env.MICROSOFT_GRAPH_URL}/invitations`, {
            invitedUserEmailAddress: email,
            inviteRedirectUrl: this.configService.get("REDIRECT_URL"),
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            var _a;
            console.error((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
            throw new Error("Error when communicate Microsoft Graph!");
        })));
        return data;
    }
    async setUserProperty(id, propertyObject) {
        const accessToken = await this.getAccessToken();
        await (0, rxjs_1.firstValueFrom)(this.httpService
            .patch(`${process.env.MICROSOFT_GRAPH_URL}/users/${id}`, propertyObject, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            var _a;
            console.error((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
            throw new Error("Error when communicate Microsoft Graph!");
        })));
    }
    async getAccessToken() {
        try {
            const { accessToken } = await this.confidentialClientApplication.acquireTokenByClientCredential({
                scopes: [".default"],
            });
            return accessToken;
        }
        catch (err) {
            console.error(err);
            switch (err) {
                case err instanceof msal_node_1.AuthError:
                    throw new Error("Auth Error from Microsoft Graph!");
                case err instanceof msal_node_1.ServerError:
                    throw new Error("Server Error from Microsoft Graph!");
                default:
                    throw new Error("Unknown Error from Microsoft Graph!");
            }
        }
    }
};
GraphService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], GraphService);
exports.GraphService = GraphService;
//# sourceMappingURL=graph.service.js.map