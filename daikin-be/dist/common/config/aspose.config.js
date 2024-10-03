"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const joi_1 = __importDefault(require("joi"));
exports.default = (0, config_1.registerAs)("aspose-config", () => {
    const values = {
        apiKey: process.env.CLOUD_CONVERT_API_KEY,
    };
    const schema = joi_1.default.object({
        apiKey: joi_1.default.string().required(),
    });
    const validateResult = schema.validate(values, { abortEarly: false });
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
    return values;
});
//# sourceMappingURL=aspose.config.js.map