import { HttpStatus, LoggerService } from "@nestjs/common";
import { ErrorDetail, LogEventStatus } from "./types";
export declare class AppLoggerService implements LoggerService {
    #private;
    constructor();
    setContext(context: string): void;
    log(message: any, ...optionalParams: any[]): void;
    info(message: any, ...optionalParams: any[]): void;
    logBusinessException(params: any, httpStatus: HttpStatus, responseTime: number, errorCode?: number, errorName?: string, errorDescription?: string): void;
    logOperationEvent(eventStatus: LogEventStatus, httpStatus: HttpStatus, responseTime?: number, params?: {}): void;
    logBusinessEvent(httpStatus: HttpStatus, responseTime?: number, params?: {}): void;
    error(err: ErrorDetail, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    debug?(message: any, ...optionalParams: any[]): void;
    verbose?(message: any, ...optionalParams: any[]): void;
}
