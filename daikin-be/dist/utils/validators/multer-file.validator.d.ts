export declare abstract class MulterFileValidator<TValidationOptions = Record<string, any>> {
    protected readonly validationOptions: TValidationOptions;
    constructor(validationOptions: TValidationOptions);
    abstract isValid(file?: any): boolean | Promise<boolean>;
    abstract buildErrorMessage(file: any): string;
}
