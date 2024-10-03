"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiNoContentTemplateResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const ApiNoContentTemplateResponse = (options) => (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(dto_1.ResponseTemplateDto), (0, swagger_1.ApiOkResponse)({
    description: options.description,
}));
exports.ApiNoContentTemplateResponse = ApiNoContentTemplateResponse;
//# sourceMappingURL=api-no-content-template-response.decorator.js.map