"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
let AppLoggerMiddleware = class AppLoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger('HTTP');
    }
    use(request, response, next) {
        const { ip, method, path: url, query, body, baseUrl, params } = request;
        const userAgent = request.get('user-agent') || '';
        response.on('close', () => {
            const { statusCode, statusMessage } = response;
            const contentLength = response.get('content-length');
            this.logger.log(`[LOG] ->  [REQUEST][METHOD]: ${method} [REQUEST][URL]:${baseUrl}  ${contentLength} - ${userAgent} ${ip}`);
            if (method === 'GET') {
                this.logger.log(`[LOG] ->  [REQUEST][PARAMS]:  ${JSON.stringify(params)}`);
                this.logger.log(`[LOG] ->  [REQUEST][QUERY]:  ${JSON.stringify(query)}`);
            }
            if (method === 'POST' || method === 'PUT') {
                this.logger.log(`[LOG] ->  [REQUEST][BODY]:  ${JSON.stringify(body)}`);
            }
            this.logger.log(`[LOG] ->  [RESPONSE][STATUS CODE]:  ${statusCode}`);
            this.logger.log(`[LOG] ->  [RESPONSE][STATUS MESSAGE]:  ${statusMessage}`);
        });
        next();
    }
};
AppLoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], AppLoggerMiddleware);
exports.AppLoggerMiddleware = AppLoggerMiddleware;
//# sourceMappingURL=AppLoggerMiddleware.js.map