import { HttpException, HttpStatus } from "@nestjs/common";
declare class CustomExceptionOptions {
    httpStatus?: HttpStatus;
    code?: string;
    message?: string;
    meta?: any;
    data?: any;
}
export declare class CustomHttpException extends HttpException {
    code: string;
    message: string | any;
    meta: any | null;
    data: any;
    httpStatusCode: HttpStatus;
    constructor(options: CustomExceptionOptions);
}
export declare class NotFoundErrorException extends CustomHttpException {
    constructor(options?: CustomExceptionOptions);
}
export declare class UnauthorizedErrorException extends CustomHttpException {
    constructor(options?: CustomExceptionOptions);
}
export declare class ForbiddenErrorException extends CustomHttpException {
    constructor(options?: CustomExceptionOptions);
}
export declare class UnprocessableErrorException extends CustomHttpException {
    constructor(options?: CustomExceptionOptions);
}
export declare class TooManyRequestsErrorException extends CustomHttpException {
    constructor(options?: CustomExceptionOptions);
}
export declare class InternalErrorException extends CustomHttpException {
    constructor(options?: CustomExceptionOptions);
}
export declare class BadRequestErrorException extends CustomHttpException {
    constructor(options?: CustomExceptionOptions);
}
export {};
