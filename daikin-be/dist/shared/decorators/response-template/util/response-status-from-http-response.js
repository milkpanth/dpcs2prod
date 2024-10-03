"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseStatusFromHttpResponse = void 0;
const common_1 = require("@nestjs/common");
const responseStatusDict = {
    200: {
        code: "S0200",
        message: "Success",
    },
    201: {
        code: "S0201",
        message: "Created",
    },
    202: {
        code: "S0202",
        message: "Accepted",
    },
    400: {
        code: "E0400",
        message: "Bad Request",
    },
    401: {
        code: "E0401",
        message: "Unauthorized",
    },
    422: {
        code: "E0422",
        message: "Unprocessable",
    },
    403: {
        code: "E0403",
        message: "Forbidden",
    },
    404: {
        code: "E0404",
        message: "Not Found",
    },
    429: {
        code: "E0429",
        message: "Too Many Requests",
    },
    500: {
        code: "E0500",
        message: "Internal Server Error",
    },
    503: {
        code: "E0503",
        message: "Service Unavailable",
    },
    504: {
        code: "E0504",
        message: "Gateway Timeout",
    },
};
function getResponseStatusFromHttpResponse(httpResponseCode) {
    if (responseStatusDict[httpResponseCode]) {
        return responseStatusDict[httpResponseCode];
    }
    return responseStatusDict[common_1.HttpStatus.INTERNAL_SERVER_ERROR];
}
exports.getResponseStatusFromHttpResponse = getResponseStatusFromHttpResponse;
//# sourceMappingURL=response-status-from-http-response.js.map