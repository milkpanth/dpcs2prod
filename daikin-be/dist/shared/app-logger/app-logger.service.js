"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AppLoggerService_instances, _AppLoggerService_context, _AppLoggerService_appName, _AppLoggerService_serviceName, _AppLoggerService_currentDateTime, _AppLoggerService_convertToLocalTimezone, _AppLoggerService_getContextFromStore, _AppLoggerService_prefix, _AppLoggerService_formatError, _AppLoggerService_logMonitoring;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLoggerService = void 0;
const common_1 = require("@nestjs/common");
const os = __importStar(require("os"));
const context_1 = require("../context");
const types_1 = require("./types");
const utils_1 = require("./utils");
let AppLoggerService = class AppLoggerService {
    constructor() {
        _AppLoggerService_instances.add(this);
        _AppLoggerService_context.set(this, "Logger");
        _AppLoggerService_appName.set(this, "daikin");
        _AppLoggerService_serviceName.set(this, "daikin-be");
    }
    setContext(context) {
        __classPrivateFieldSet(this, _AppLoggerService_context, context, "f");
    }
    log(message, ...optionalParams) {
        console.info(__classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_prefix).call(this, types_1.LogType.INFO, message), ...optionalParams);
    }
    info(message, ...optionalParams) {
        console.info(__classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_prefix).call(this, types_1.LogType.INFO, message), ...optionalParams);
    }
    logBusinessException(params, httpStatus, responseTime, errorCode = 0, errorName = "", errorDescription = "") {
        const { uri = "-" } = __classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_getContextFromStore).call(this);
        const operation = {
            event_type: types_1.LogEventType.BUSSINESS_ERROR,
            status: types_1.LogEventStatus.FAIL,
            parameters: Object.assign({}, params),
            http_code: httpStatus,
            error_code: errorCode,
            error_name: errorName,
            error_description: errorDescription,
            response_time: responseTime,
            uri: uri,
        };
        console.info(__classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_prefix).call(this, types_1.LogType.WARN, `EVENT ${(0, utils_1.forceJsonStringify)(operation)}`));
    }
    logOperationEvent(eventStatus, httpStatus, responseTime = 0, params = {}) {
        __classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_logMonitoring).call(this, types_1.LogEventType.OPERATION, eventStatus, httpStatus, params, responseTime);
    }
    logBusinessEvent(httpStatus, responseTime = 0, params = {}) {
        __classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_logMonitoring).call(this, types_1.LogEventType.BUSINESS, types_1.LogEventStatus.SUCCESS, httpStatus, params, responseTime);
    }
    error(err, ...optionalParams) {
        console.error(__classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_prefix).call(this, types_1.LogType.ERROR, __classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_formatError).call(this, err)), ...optionalParams);
    }
    warn(message, ...optionalParams) {
        console.warn(message, ...optionalParams);
    }
    debug(message, ...optionalParams) {
        console.debug(message, ...optionalParams);
    }
    verbose(message, ...optionalParams) {
        console.trace(message, ...optionalParams);
    }
};
_AppLoggerService_context = new WeakMap(), _AppLoggerService_appName = new WeakMap(), _AppLoggerService_serviceName = new WeakMap(), _AppLoggerService_instances = new WeakSet(), _AppLoggerService_currentDateTime = function _AppLoggerService_currentDateTime() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localeDateTime = __classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_convertToLocalTimezone).call(this, now);
    const offsetHours = (offset < 0 ? "+" : "-") +
        (Math.abs(offset) / 60).toString().padStart(2, "0");
    const offsetMinutes = (Math.abs(offset) % 60).toString().padStart(2, "0");
    const offsetStr = `${offsetHours}:${offsetMinutes}`;
    return localeDateTime.toISOString().slice(0, 19) + offsetStr;
}, _AppLoggerService_convertToLocalTimezone = function _AppLoggerService_convertToLocalTimezone(inputDate) {
    const offset = inputDate.getTimezoneOffset();
    return new Date(inputDate.setMinutes(inputDate.getMinutes() - offset));
}, _AppLoggerService_getContextFromStore = function _AppLoggerService_getContextFromStore() {
    const store = context_1.asyncLocalStorage.getStore();
    if (!store) {
        return {};
    }
    return {
        reqId: store.get("reqId"),
        sessionId: store.get("userId"),
        uri: store.get("uri"),
    };
}, _AppLoggerService_prefix = function _AppLoggerService_prefix(logType, message) {
    const { reqId = "-", sessionId = "-" } = __classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_getContextFromStore).call(this);
    return `${__classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_currentDateTime).call(this)} ${__classPrivateFieldGet(this, _AppLoggerService_appName, "f")}-${__classPrivateFieldGet(this, _AppLoggerService_serviceName, "f")} ${os.hostname()} ${logType} ${__classPrivateFieldGet(this, _AppLoggerService_context, "f")} ${sessionId} ${reqId} - ${message}`;
}, _AppLoggerService_formatError = function _AppLoggerService_formatError(errorDetail) {
    const { uri = "-" } = __classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_getContextFromStore).call(this);
    return `ERROR ${uri} ${errorDetail.stack || errorDetail.message} ${(0, utils_1.forceJsonStringify)(errorDetail.inputParameter)} ${(0, utils_1.forceJsonStringify)(errorDetail.variable)}`;
}, _AppLoggerService_logMonitoring = function _AppLoggerService_logMonitoring(eventType, eventStatus, httpStatus, params = {}, responseTime = 0) {
    const { uri = "-" } = __classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_getContextFromStore).call(this);
    const operation = {
        event_type: eventType,
        status: eventStatus,
        parameters: Object.assign({}, params),
        http_code: httpStatus,
        response_time: responseTime,
        uri: uri,
    };
    console.info(__classPrivateFieldGet(this, _AppLoggerService_instances, "m", _AppLoggerService_prefix).call(this, types_1.LogType.INFO, `EVENT ${(0, utils_1.forceJsonStringify)(operation)}`));
};
AppLoggerService = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.TRANSIENT,
    }),
    __metadata("design:paramtypes", [])
], AppLoggerService);
exports.AppLoggerService = AppLoggerService;
//# sourceMappingURL=app-logger.service.js.map