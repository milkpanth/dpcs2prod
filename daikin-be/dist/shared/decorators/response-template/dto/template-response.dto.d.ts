export declare class ResponseStatusDto {
    code: string;
    message: string;
    meta?: any;
    stack?: any;
}
export declare class ResponseTemplateDto<T> {
    status: ResponseStatusDto;
    data?: T;
}
