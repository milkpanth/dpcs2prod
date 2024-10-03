"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDefaultErrorsTemplateResponse = void 0;
const common_1 = require("@nestjs/common");
const api_error_template_response_decorator_1 = require("./api-error-template-response.decorator");
const dto_1 = require("./dto");
class ApiDefaultErrorsTemplateResponseOptions {
    constructor() {
        this.disableNotFound = false;
        this.disableInternalServerError = false;
        this.disableBadRequest = false;
        this.disableForbidden = false;
        this.disableTooManyRequests = false;
        this.disableUnauthorized = false;
        this.disableUnprocessable = false;
    }
}
const ApiDefaultErrorsTemplateResponse = (options) => {
    if (!options) {
        return (0, common_1.applyDecorators)((0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.NOT_FOUND,
            model: dto_1.ErrorNotFoundDto,
        }), (0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            model: dto_1.ErrorInternalServerDto,
        }), (0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.BAD_REQUEST,
            model: dto_1.ErrorBadRequestDto,
        }), (0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.UNAUTHORIZED,
            model: dto_1.ErrorUnauthorizeRequestDto,
        }), (0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
            model: dto_1.ErrorUnprocessableRequestDto,
        }), (0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.FORBIDDEN,
            model: dto_1.ErrorForbiddenRequestDto,
        }), (0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.TOO_MANY_REQUESTS,
            model: dto_1.ErrorTooManyRequestsDto,
        }));
    }
    const listDecorators = [];
    if (!options.disableNotFound) {
        listDecorators.push((0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.NOT_FOUND,
            model: dto_1.ErrorNotFoundDto,
        }));
    }
    if (!options.disableInternalServerError) {
        listDecorators.push((0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            model: dto_1.ErrorInternalServerDto,
        }));
    }
    if (!options.disableBadRequest) {
        listDecorators.push((0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.BAD_REQUEST,
            model: dto_1.ErrorBadRequestDto,
        }));
    }
    if (!options.disableForbidden) {
        listDecorators.push((0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.FORBIDDEN,
            model: dto_1.ErrorForbiddenRequestDto,
        }));
    }
    if (!options.disableTooManyRequests) {
        listDecorators.push((0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.TOO_MANY_REQUESTS,
            model: dto_1.ErrorTooManyRequestsDto,
        }));
    }
    if (!options.disableUnprocessable) {
        listDecorators.push((0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
            model: dto_1.ErrorUnprocessableRequestDto,
        }));
    }
    if (!options.disableUnauthorized) {
        listDecorators.push((0, api_error_template_response_decorator_1.ApiErrorTemplateResponse)({
            httpStatus: common_1.HttpStatus.UNAUTHORIZED,
            model: dto_1.ErrorUnauthorizeRequestDto,
        }));
    }
    return (0, common_1.applyDecorators)(...listDecorators);
};
exports.ApiDefaultErrorsTemplateResponse = ApiDefaultErrorsTemplateResponse;
//# sourceMappingURL=api-default-error-template-response.decorator.js.map