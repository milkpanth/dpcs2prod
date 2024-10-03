export interface DatabaseConfig {
    dbHost: string;
    dbPort: string;
    dbUsername: string;
    dbPassword: string;
    dbUseName: string;
    dbLiveName: string;
    dbLogging: string;
}
declare const _default: (() => DatabaseConfig) & import("@nestjs/config").ConfigFactoryKeyHost<DatabaseConfig>;
export default _default;
