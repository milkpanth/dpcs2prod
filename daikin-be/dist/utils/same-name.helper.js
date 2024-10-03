"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWhereConditionWithSameName = void 0;
const getWhereConditionWithSameName = (status) => {
    if (status === false || status === "false")
        return { SameName: false };
    if (status === true || status === "true")
        return { SameName: true };
    return {};
};
exports.getWhereConditionWithSameName = getWhereConditionWithSameName;
//# sourceMappingURL=same-name.helper.js.map