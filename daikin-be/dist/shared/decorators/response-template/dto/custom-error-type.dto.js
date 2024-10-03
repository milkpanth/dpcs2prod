"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestErrorException = exports.InternalErrorException = exports.TooManyRequestsErrorException = exports.UnprocessableErrorException = exports.ForbiddenErrorException = exports.UnauthorizedErrorException = exports.NotFoundErrorException = exports.CustomHttpException = void 0;
const common_1 = require("@nestjs/common");
const util_1 = require("../util");
class CustomExceptionOptions {
}
class CustomHttpException extends common_1.HttpException {
    constructor(options) {
        super({
            code: options.code,
            message: options.message,
            meta: options.meta,
        }, options.httpStatus);
        this.httpStatusCode = options.httpStatus
            ? options.httpStatus
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        this.code = options.code ? options.code : "UnknownError";
        this.message = options.message ? options.message : "Unknown error";
        this.meta = options.meta;
        this.data = options.data || {};
    }
}
exports.CustomHttpException = CustomHttpException;
class NotFoundErrorException extends CustomHttpException {
    constructor(options) {
        const defaultError = (0, util_1.getResponseStatusFromHttpResponse)(common_1.HttpStatus.NOT_FOUND);
        const errRespCode = (options === null || options === void 0 ? void 0 : options.code) ? options.code : defaultError.code;
        const errRespMessage = (options === null || options === void 0 ? void 0 : options.message)
            ? options.message
            : defaultError.message;
        super({
            httpStatus: common_1.HttpStatus.NOT_FOUND,
            code: errRespCode,
            message: errRespMessage,
            meta: options === null || options === void 0 ? void 0 : options.meta,
            data: options === null || options === void 0 ? void 0 : options.data,
        });
    }
}
exports.NotFoundErrorException = NotFoundErrorException;
class UnauthorizedErrorException extends CustomHttpException {
    constructor(options) {
        const defaultError = (0, util_1.getResponseStatusFromHttpResponse)(common_1.HttpStatus.UNAUTHORIZED);
        const errRespCode = (options === null || options === void 0 ? void 0 : options.code) ? options.code : defaultError.code;
        const errRespMessage = (options === null || options === void 0 ? void 0 : options.message)
            ? options.message
            : defaultError.message;
        super({
            httpStatus: common_1.HttpStatus.UNAUTHORIZED,
            code: errRespCode,
            message: errRespMessage,
            meta: options === null || options === void 0 ? void 0 : options.meta,
            data: options === null || options === void 0 ? void 0 : options.data,
        });
    }
}
exports.UnauthorizedErrorException = UnauthorizedErrorException;
class ForbiddenErrorException extends CustomHttpException {
    constructor(options) {
        const defaultError = (0, util_1.getResponseStatusFromHttpResponse)(common_1.HttpStatus.FORBIDDEN);
        const errRespCode = (options === null || options === void 0 ? void 0 : options.code) ? options.code : defaultError.code;
        const errRespMessage = (options === null || options === void 0 ? void 0 : options.message)
            ? options.message
            : defaultError.message;
        super({
            httpStatus: common_1.HttpStatus.FORBIDDEN,
            code: errRespCode,
            message: errRespMessage,
            meta: options === null || options === void 0 ? void 0 : options.meta,
            data: options === null || options === void 0 ? void 0 : options.data,
        });
    }
}
exports.ForbiddenErrorException = ForbiddenErrorException;
class UnprocessableErrorException extends CustomHttpException {
    constructor(options) {
        const defaultError = (0, util_1.getResponseStatusFromHttpResponse)(common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        const errRespCode = (options === null || options === void 0 ? void 0 : options.code) ? options.code : defaultError.code;
        const errRespMessage = (options === null || options === void 0 ? void 0 : options.message)
            ? options.message
            : defaultError.message;
        super({
            httpStatus: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
            code: errRespCode,
            message: errRespMessage,
            meta: options === null || options === void 0 ? void 0 : options.meta,
            data: options === null || options === void 0 ? void 0 : options.data,
        });
    }
}
exports.UnprocessableErrorException = UnprocessableErrorException;
class TooManyRequestsErrorException extends CustomHttpException {
    constructor(options) {
        const defaultError = (0, util_1.getResponseStatusFromHttpResponse)(common_1.HttpStatus.TOO_MANY_REQUESTS);
        const errRespCode = (options === null || options === void 0 ? void 0 : options.code) ? options.code : defaultError.code;
        const errRespMessage = (options === null || options === void 0 ? void 0 : options.message)
            ? options.message
            : defaultError.message;
        super({
            httpStatus: common_1.HttpStatus.TOO_MANY_REQUESTS,
            code: errRespCode,
            message: errRespMessage,
            meta: options === null || options === void 0 ? void 0 : options.meta,
            data: options === null || options === void 0 ? void 0 : options.data,
        });
    }
}
exports.TooManyRequestsErrorException = TooManyRequestsErrorException;
class InternalErrorException extends CustomHttpException {
    constructor(options) {
        const defaultError = (0, util_1.getResponseStatusFromHttpResponse)(common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        const errRespCode = (options === null || options === void 0 ? void 0 : options.code) ? options.code : defaultError.code;
        const errRespMessage = (options === null || options === void 0 ? void 0 : options.message)
            ? options.message
            : defaultError.message;
        super({
            httpStatus: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            code: errRespCode,
            message: errRespMessage,
            meta: options === null || options === void 0 ? void 0 : options.meta,
            data: options === null || options === void 0 ? void 0 : options.data,
        });
    }
}
exports.InternalErrorException = InternalErrorException;
class BadRequestErrorException extends CustomHttpException {
    constructor(options) {
        const defaultError = (0, util_1.getResponseStatusFromHttpResponse)(common_1.HttpStatus.BAD_REQUEST);
        const errRespCode = (options === null || options === void 0 ? void 0 : options.code) ? options.code : defaultError.code;
        const errRespMessage = (options === null || options === void 0 ? void 0 : options.message)
            ? options.message
            : defaultError.message;
        super({
            httpStatus: common_1.HttpStatus.BAD_REQUEST,
            code: errRespCode,
            message: errRespMessage,
            meta: options === null || options === void 0 ? void 0 : options.meta,
            data: options === null || options === void 0 ? void 0 : options.data,
        });
    }
}
exports.BadRequestErrorException = BadRequestErrorException;
//# sourceMappingURL=custom-error-type.dto.js.map