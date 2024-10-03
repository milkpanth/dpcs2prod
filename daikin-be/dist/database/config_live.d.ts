import { DataSource, DataSourceOptions } from "typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SeederOptions } from "typeorm-extension";
export declare const dataSourceConfig: DataSourceOptions & SeederOptions;
export declare const liveTypeORMModuleConfig: TypeOrmModuleOptions;
declare const _default: DataSource;
export default _default;
