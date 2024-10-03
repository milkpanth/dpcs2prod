"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const joi_1 = __importDefault(require("joi"));
const appNameDefault = "DAIKIN-BE";
const swaggerTitleDefault = `${appNameDefault} API`;
const swaggerDescriptionDefault = `${swaggerTitleDefault} 📕 Documentations and Space Documentations ✨ Powered by Niche-Est Solution(Thailand) Co.,Ltd.`;
const swaggerVersionDefault = "1.0";
exports.default = (0, config_1.registerAs)("app-config", () => {
    const values = {
        appName: process.env.HTTPS_CERTIFICATE_FILE || appNameDefault,
        port: parseInt(process.env.PORT) || 443,
        redirectUrl: process.env.REDIRECT_URL,
        swaggerTitle: process.env.SWAGGER_TITLE || swaggerTitleDefault,
        swaggerDescription: process.env.SWAGGER_DESCRIPTION || swaggerDescriptionDefault,
        swaggerVersion: process.env.SWAGGER_DESCRIPTION || swaggerVersionDefault,
        disableSwagger: process.env.DISABLE_SWAGGER || "true",
    };
    const schema = joi_1.default.object({
        appName: joi_1.default.string().required(),
        port: joi_1.default.number().required(),
        redirectUrl: joi_1.default.string().required(),
        swaggerTitle: joi_1.default.string().required(),
        swaggerDescription: joi_1.default.string().required(),
        swaggerVersion: joi_1.default.string().required(),
        disableSwagger: joi_1.default.string().required(),
    });
    const validateResult = schema.validate(values, { abortEarly: false });
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
    return values;
});
//# sourceMappingURL=app.config.js.map