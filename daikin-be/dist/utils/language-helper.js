"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageList = void 0;
const UserTypeEnum_enum_1 = require("../shared/enum/UserTypeEnum.enum");
const getLanguageList = (country, userType) => {
    if (userType) {
        if (userType === UserTypeEnum_enum_1.UserTypeEnum.SUPERADMIN ||
            userType === UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN) {
            return ["EN", "TH", "VN"];
        }
    }
    switch (country) {
        case "TH":
            return ["EN", "TH"];
        case "VN":
            return ["EN", "VN"];
        default:
            return ["EN"];
    }
};
exports.getLanguageList = getLanguageList;
//# sourceMappingURL=language-helper.js.map