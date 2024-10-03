"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const Joi = __importStar(require("joi"));
exports.default = (0, config_1.registerAs)("database-config", () => {
    const values = {
        dbHost: process.env.DB_HOST,
        dbPort: process.env.DB_PORT,
        dbUsername: process.env.DB_USERNAME,
        dbPassword: process.env.DB_PASSWORD,
        dbUseName: process.env.DB_USE_NAME,
        dbLiveName: process.env.DB_LIVE_NAME,
        dbLogging: process.env.DB_LOGGING,
    };
    const schema = Joi.object({
        dbHost: Joi.string().required(),
        dbPort: Joi.string().required(),
        dbUsername: Joi.string().required(),
        dbPassword: Joi.string().required(),
        dbUseName: Joi.string().required(),
        dbLiveName: Joi.string().required(),
        dbLogging: Joi.string().required(),
    });
    const validateResult = schema.validate(values, { abortEarly: false });
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
    return values;
});
//# sourceMappingURL=database.config.js.map