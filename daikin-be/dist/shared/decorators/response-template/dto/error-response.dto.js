"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorTooManyRequestsDto = exports.ErrorUnprocessableRequestDto = exports.ErrorForbiddenRequestDto = exports.ErrorUnauthorizeRequestDto = exports.ErrorBadRequestDto = exports.ErrorInternalServerDto = exports.ErrorNotFoundDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ErrorNotFoundDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "error code", example: "E0404" }),
    __metadata("design:type", String)
], ErrorNotFoundDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "error message", example: "Not Found" }),
    __metadata("design:type", Object)
], ErrorNotFoundDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "meta display object validation or string message (only local environment)",
        required: false,
    }),
    __metadata("design:type", Object)
], ErrorNotFoundDto.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: "error stacktrace (only local environment)",
        example: "NotFoundErrorException: not found todo: o6he03WXl4c5OJ8\n    at TodosService.getById (/Users/wichit/Documents/goproject/src/bitbucket.tmbbank.local/boilerplate-nestjs-backend/src/todos/todos.service.ts:32:13)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)",
    }),
    __metadata("design:type", String)
], ErrorNotFoundDto.prototype, "stack", void 0);
exports.ErrorNotFoundDto = ErrorNotFoundDto;
class ErrorInternalServerDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "error code", example: "E0500" }),
    __metadata("design:type", String)
], ErrorInternalServerDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "error message",
        example: "Internal Server Error",
    }),
    __metadata("design:type", Object)
], ErrorInternalServerDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "meta display object validation or string message (only local environment)",
        required: false,
    }),
    __metadata("design:type", Object)
], ErrorInternalServerDto.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: "error stacktrace (only local environment)",
    }),
    __metadata("design:type", String)
], ErrorInternalServerDto.prototype, "stack", void 0);
exports.ErrorInternalServerDto = ErrorInternalServerDto;
class ErrorBadRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "error code", example: "E0400" }),
    __metadata("design:type", String)
], ErrorBadRequestDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "error message", example: "Bad Request" }),
    __metadata("design:type", Object)
], ErrorBadRequestDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "meta display object validation or string message (only local environment)",
        example: {
            validationErrors: [
                {
                    fieldName: "creatorName",
                    constraints: {
                        isNotEmpty: "creatorName should not be empty",
                        isString: "creatorName must be a string",
                    },
                },
            ],
        },
    }),
    __metadata("design:type", Object)
], ErrorBadRequestDto.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "error stacktrace (only local environment)",
    }),
    __metadata("design:type", String)
], ErrorBadRequestDto.prototype, "stack", void 0);
exports.ErrorBadRequestDto = ErrorBadRequestDto;
class ErrorUnauthorizeRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "error code", example: "E0401" }),
    __metadata("design:type", String)
], ErrorUnauthorizeRequestDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "error message", example: "Unauthorized" }),
    __metadata("design:type", Object)
], ErrorUnauthorizeRequestDto.prototype, "message", void 0);
exports.ErrorUnauthorizeRequestDto = ErrorUnauthorizeRequestDto;
class ErrorForbiddenRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "error code", example: "E0403" }),
    __metadata("design:type", String)
], ErrorForbiddenRequestDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "error message", example: "Forbidden" }),
    __metadata("design:type", Object)
], ErrorForbiddenRequestDto.prototype, "message", void 0);
exports.ErrorForbiddenRequestDto = ErrorForbiddenRequestDto;
class ErrorUnprocessableRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "error code", example: "E0422" }),
    __metadata("design:type", String)
], ErrorUnprocessableRequestDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "error message", example: "Unprocessable" }),
    __metadata("design:type", Object)
], ErrorUnprocessableRequestDto.prototype, "message", void 0);
exports.ErrorUnprocessableRequestDto = ErrorUnprocessableRequestDto;
class ErrorTooManyRequestsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "error code", example: "E0429" }),
    __metadata("design:type", String)
], ErrorTooManyRequestsDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "error message", example: "Too many requests" }),
    __metadata("design:type", Object)
], ErrorTooManyRequestsDto.prototype, "message", void 0);
exports.ErrorTooManyRequestsDto = ErrorTooManyRequestsDto;
//# sourceMappingURL=error-response.dto.js.map