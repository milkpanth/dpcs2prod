declare class ApiDefaultErrorsTemplateResponseOptions {
    disableNotFound?: boolean;
    disableInternalServerError?: boolean;
    disableBadRequest?: boolean;
    disableForbidden?: boolean;
    disableTooManyRequests?: boolean;
    disableUnauthorized?: boolean;
    disableUnprocessable?: boolean;
}
export declare const ApiDefaultErrorsTemplateResponse: (options?: ApiDefaultErrorsTemplateResponseOptions) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
