import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
export declare const dataSourceConfig: DataSourceOptions & SeederOptions;
export declare const useTypeORMModuleConfig: (import("typeorm/driver/mysql/MysqlConnectionOptions").MysqlConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/mysql/MysqlConnectionOptions").MysqlConnectionOptions>) | (import("typeorm/driver/postgres/PostgresConnectionOptions").PostgresConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/postgres/PostgresConnectionOptions").PostgresConnectionOptions>) | (import("typeorm/driver/cockroachdb/CockroachConnectionOptions").CockroachConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/cockroachdb/CockroachConnectionOptions").CockroachConnectionOptions>) | (import("typeorm/driver/sqlite/SqliteConnectionOptions").SqliteConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/sqlite/SqliteConnectionOptions").SqliteConnectionOptions>) | (import("typeorm/driver/sqlserver/SqlServerConnectionOptions").SqlServerConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/sqlserver/SqlServerConnectionOptions").SqlServerConnectionOptions>) | (import("typeorm/driver/sap/SapConnectionOptions").SapConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/sap/SapConnectionOptions").SapConnectionOptions>) | (import("typeorm/driver/oracle/OracleConnectionOptions").OracleConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/oracle/OracleConnectionOptions").OracleConnectionOptions>) | (import("typeorm/driver/cordova/CordovaConnectionOptions").CordovaConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/cordova/CordovaConnectionOptions").CordovaConnectionOptions>) | (import("typeorm/driver/nativescript/NativescriptConnectionOptions").NativescriptConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/nativescript/NativescriptConnectionOptions").NativescriptConnectionOptions>) | (import("typeorm/driver/react-native/ReactNativeConnectionOptions").ReactNativeConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/react-native/ReactNativeConnectionOptions").ReactNativeConnectionOptions>) | (import("typeorm/driver/sqljs/SqljsConnectionOptions").SqljsConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/sqljs/SqljsConnectionOptions").SqljsConnectionOptions>) | (import("typeorm/driver/mongodb/MongoConnectionOptions").MongoConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/mongodb/MongoConnectionOptions").MongoConnectionOptions>) | (import("typeorm/driver/aurora-mysql/AuroraMysqlConnectionOptions").AuroraMysqlConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/aurora-mysql/AuroraMysqlConnectionOptions").AuroraMysqlConnectionOptions>) | (import("typeorm/driver/aurora-postgres/AuroraPostgresConnectionOptions").AuroraPostgresConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/aurora-postgres/AuroraPostgresConnectionOptions").AuroraPostgresConnectionOptions>) | (import("typeorm/driver/expo/ExpoConnectionOptions").ExpoConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/expo/ExpoConnectionOptions").ExpoConnectionOptions>) | (import("typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions").BetterSqlite3ConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions").BetterSqlite3ConnectionOptions>) | (import("typeorm/driver/capacitor/CapacitorConnectionOptions").CapacitorConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/capacitor/CapacitorConnectionOptions").CapacitorConnectionOptions>) | (import("typeorm/driver/spanner/SpannerConnectionOptions").SpannerConnectionOptions & {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/spanner/SpannerConnectionOptions").SpannerConnectionOptions>);
declare const _default: DataSource;
export default _default;
