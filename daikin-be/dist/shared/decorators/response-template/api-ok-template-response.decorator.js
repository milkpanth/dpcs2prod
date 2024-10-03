"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiOkTemplateResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const ApiOkTemplateResponse = (options) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(dto_1.ResponseTemplateDto), (0, swagger_1.ApiOkResponse)({
        description: options.description,
        schema: {
            allOf: [
                {
                    $ref: (0, swagger_1.getSchemaPath)(options.model),
                },
            ],
        },
    }));
};
exports.ApiOkTemplateResponse = ApiOkTemplateResponse;
//# sourceMappingURL=api-ok-template-response.decorator.js.map