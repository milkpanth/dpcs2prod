"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendGlobalCompany = exports.filterCompanyList = exports.companyWhereFilter = void 0;
const UserTypeEnum_enum_1 = require("../shared/enum/UserTypeEnum.enum");
const companyWhereFilter = (user, optional) => {
    if ([UserTypeEnum_enum_1.UserTypeEnum.LOCALADMIN, UserTypeEnum_enum_1.UserTypeEnum.LOCALUSER].includes(user.Type)) {
        return {
            CompanyCode: user.CompanyCode,
        };
    }
    if (optional) {
        return {
            CompanyCode: optional,
        };
    }
    return {};
};
exports.companyWhereFilter = companyWhereFilter;
const filterCompanyList = (companyList, excludeCompany) => {
    if (excludeCompany == null) {
        excludeCompany = "";
    }
    return companyList.filter((c) => c.CompanyCode != excludeCompany);
};
exports.filterCompanyList = filterCompanyList;
const appendGlobalCompany = (companyList) => companyList.push({
    CreatedBy: null,
    UpdatedBy: null,
    CreatedDate: null,
    UpdatedDate: null,
    DeletedDate: null,
    CompanyCode: "",
    Name: "Global",
});
exports.appendGlobalCompany = appendGlobalCompany;
//# sourceMappingURL=company-helper.js.map