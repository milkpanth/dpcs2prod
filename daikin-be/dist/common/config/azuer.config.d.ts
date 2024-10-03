export interface AzureConfig {
    clientId: string;
    tenantId: string;
    clientSecretValue: string;
    azureAdLogging: string;
    storageBlobConnectionString: string;
    microsoftGraphUrl: string;
}
declare const _default: (() => AzureConfig) & import("@nestjs/config").ConfigFactoryKeyHost<AzureConfig>;
export default _default;
