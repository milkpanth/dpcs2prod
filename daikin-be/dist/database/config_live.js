"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveTypeORMModuleConfig = exports.dataSourceConfig = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const db_1 = require("../shared/constants/db");
config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: [".env"] });
const configService = new config_1.ConfigService();
const baseConfig = {
    name: db_1.LIVE_DB_NAME,
    type: "mysql",
    host: configService.get("DB_HOST"),
    port: Number(configService.get("DB_PORT")) || 3306,
    username: configService.get("DB_USERNAME"),
    password: configService.get("DB_PASSWORD"),
    database: configService.get("DB_LIVE_NAME"),
    logging: configService.get("DB_LOGGING") == "true",
    ssl: {
        rejectUnauthorized: false,
    },
    charset: "utf8mb4_unicode_ci",
};
exports.dataSourceConfig = Object.assign({ entities: ["./src/modules/**/entities/*.entity.ts"], migrations: ["./src/database/migrations/*.{ts,js}"], seeds: ["./src/database/seeds/*.{ts,js}"] }, baseConfig);
exports.liveTypeORMModuleConfig = Object.assign({ entities: ["./dist/modules/**/entities/*.entity.js"] }, baseConfig);
exports.default = new typeorm_1.DataSource(exports.dataSourceConfig);
//# sourceMappingURL=config_live.js.map