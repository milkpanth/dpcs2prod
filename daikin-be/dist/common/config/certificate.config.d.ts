export interface CertificateConfig {
    httpsCertificateFile: string;
    httpsCertificatePassphrase: string;
}
declare const _default: (() => CertificateConfig) & import("@nestjs/config").ConfigFactoryKeyHost<CertificateConfig>;
export default _default;
