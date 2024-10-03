"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseStatusOption = exports.getBaseWhereOption = exports.getBaseOrderingOption = exports.getBasePaginationOption = void 0;
const typeorm_1 = require("typeorm");
const getBasePaginationOption = (paginationDto) => {
    return {
        page: paginationDto.page || 1,
        limit: paginationDto.limit || 10,
    };
};
exports.getBasePaginationOption = getBasePaginationOption;
const getBaseOrderingOption = (paginationDto) => {
    const orderOption = {};
    if (paginationDto.order && paginationDto.direction) {
        Object.assign(orderOption, createNestedObjectFromText(paginationDto.order, paginationDto.direction));
    }
    return orderOption;
};
exports.getBaseOrderingOption = getBaseOrderingOption;
const getBaseWhereOption = (paginationDto, onKeywordOption, onBaseOption) => {
    return paginationDto.keyword
        ? onKeywordOption
        : onBaseOption
            ? onBaseOption
            : {};
};
exports.getBaseWhereOption = getBaseWhereOption;
const getBaseStatusOption = (statusDto) => {
    const whereOption = {};
    if (statusDto.useStatus) {
        Object.assign(whereOption, {
            Use: Array.isArray(statusDto.useStatus)
                ? (0, typeorm_1.In)(statusDto.useStatus)
                : statusDto.useStatus,
        });
    }
    if (statusDto.liveStatus) {
        Object.assign(whereOption, {
            Live: Array.isArray(statusDto.liveStatus)
                ? (0, typeorm_1.In)(statusDto.liveStatus)
                : statusDto.liveStatus,
        });
    }
    return whereOption;
};
exports.getBaseStatusOption = getBaseStatusOption;
const createNestedObjectFromText = (text, value) => {
    const parts = text.split(",");
    let currentObject = {};
    for (let i = parts.length - 1; i >= 0; i--) {
        const key = parts[i].trim();
        currentObject = {
            [key]: i == parts.length - 1 ? value : Object.assign({}, currentObject),
        };
    }
    return currentObject;
};
//# sourceMappingURL=pagination.js.map