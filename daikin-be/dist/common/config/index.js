"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = exports.certificateConfig = exports.azureConfig = exports.asposeConfig = exports.appConfig = void 0;
const app_config_1 = __importDefault(require("./app.config"));
exports.appConfig = app_config_1.default;
const aspose_config_1 = __importDefault(require("./aspose.config"));
exports.asposeConfig = aspose_config_1.default;
const azuer_config_1 = __importDefault(require("./azuer.config"));
exports.azureConfig = azuer_config_1.default;
const certificate_config_1 = __importDefault(require("./certificate.config"));
exports.certificateConfig = certificate_config_1.default;
const database_config_1 = __importDefault(require("./database.config"));
exports.databaseConfig = database_config_1.default;
//# sourceMappingURL=index.js.map