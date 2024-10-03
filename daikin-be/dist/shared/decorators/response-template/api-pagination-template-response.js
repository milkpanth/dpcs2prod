"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPaginatedTemplateResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const ApiPaginatedTemplateResponse = (options) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(dto_1.PaginationResponseDto), (0, swagger_1.ApiOkResponse)({
        description: options.description,
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(dto_1.PaginationResponseDto) },
                {
                    properties: {
                        items: {
                            type: "array",
                            items: { $ref: (0, swagger_1.getSchemaPath)(options.model) },
                        },
                    },
                },
            ],
        },
    }));
};
exports.ApiPaginatedTemplateResponse = ApiPaginatedTemplateResponse;
//# sourceMappingURL=api-pagination-template-response.js.map