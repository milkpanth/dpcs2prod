"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEventStatus = exports.LogEventType = exports.LogType = void 0;
var LogType;
(function (LogType) {
    LogType["INFO"] = "INFO";
    LogType["WARN"] = "WARN";
    LogType["ERROR"] = "ERROR";
    LogType["DEBUG"] = "DEBUG";
    LogType["TRACE"] = "TRACE";
})(LogType = exports.LogType || (exports.LogType = {}));
var LogEventType;
(function (LogEventType) {
    LogEventType["OPERATION"] = "OPERATION";
    LogEventType["BUSSINESS_ERROR"] = "BIZ-ERROR";
    LogEventType["BUSINESS"] = "BUSINESS";
})(LogEventType = exports.LogEventType || (exports.LogEventType = {}));
var LogEventStatus;
(function (LogEventStatus) {
    LogEventStatus["SUCCESS"] = "SUCCESS";
    LogEventStatus["FAIL"] = "FAIL";
})(LogEventStatus = exports.LogEventStatus || (exports.LogEventStatus = {}));
//# sourceMappingURL=types.js.map