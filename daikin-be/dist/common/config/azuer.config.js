"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const joi_1 = __importDefault(require("joi"));
exports.default = (0, config_1.registerAs)("azure-config", () => {
    const values = {
        clientId: process.env.AZURE_CLIENT_ID,
        tenantId: process.env.AZURE_TENANT_ID,
        clientSecretValue: process.env.AZURE_CLIENT_SECRET,
        azureAdLogging: process.env.AZURE_AD_LOGGING,
        storageBlobConnectionString: process.env.AZURE_STORAGE_BLOB_CONNECTION,
        microsoftGraphUrl: process.env.MICROSOFT_GRAPH_URL,
    };
    const schema = joi_1.default.object({
        clientId: joi_1.default.string().required(),
        tenantId: joi_1.default.string().required(),
        clientSecretValue: joi_1.default.string().required(),
        azureAdLogging: joi_1.default.string().required(),
        storageBlobConnectionString: joi_1.default.string().required(),
        microsoftGraphUrl: joi_1.default.string().required(),
    });
    const validateResult = schema.validate(values, { abortEarly: false });
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
    return values;
});
//# sourceMappingURL=azuer.config.js.map