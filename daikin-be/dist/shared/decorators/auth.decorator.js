"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDecorator = void 0;
const common_1 = require("@nestjs/common");
exports.AuthDecorator = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    return user;
});
//# sourceMappingURL=auth.decorator.js.map