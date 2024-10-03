export interface AppConfig {
    appName: string;
    port: number;
    redirectUrl: string;
    swaggerTitle: string;
    swaggerDescription: string;
    swaggerVersion: string;
    disableSwagger: string;
}
declare const _default: (() => AppConfig) & import("@nestjs/config").ConfigFactoryKeyHost<AppConfig>;
export default _default;
