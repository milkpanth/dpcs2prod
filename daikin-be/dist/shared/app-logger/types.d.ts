export type ErrorDetail = {
    stack?: string;
    message?: string;
    inputParameter?: any;
    variable?: any;
};
export declare enum LogType {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG",
    TRACE = "TRACE"
}
export declare enum LogEventType {
    OPERATION = "OPERATION",
    BUSSINESS_ERROR = "BIZ-ERROR",
    BUSINESS = "BUSINESS"
}
export declare enum LogEventStatus {
    SUCCESS = "SUCCESS",
    FAIL = "FAIL"
}
