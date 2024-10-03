"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const companylanguage_entity_1 = require("../../modules/companylanguages/entities/companylanguage.entity");
const user_1 = require("../../shared/constants/user");
class CompanyLanguages1700732658900 {
    async run(dataSource) {
        const repository = dataSource.getRepository(companylanguage_entity_1.CompanyLanguage);
        await repository.insert([
            {
                CompanyCode: user_1.MS_GRAPH_DEFAULT_COMPANY_CODE,
                Language: "EN",
            },
            {
                CompanyCode: "INTAUS0001",
                Language: "EN",
            },
            {
                CompanyCode: "INTIDN0001",
                Language: "EN",
            },
            {
                CompanyCode: "INTMYS0001",
                Language: "EN",
            },
            {
                CompanyCode: "INTMYS0002",
                Language: "EN",
            },
            {
                CompanyCode: "INTNZL0001",
                Language: "EN",
            },
            {
                CompanyCode: "INTPHL0001",
                Language: "EN",
            },
            {
                CompanyCode: "INTSGP0001",
                Language: "EN",
            },
            {
                CompanyCode: "INTTHA0001",
                Language: "EN",
            },
            {
                CompanyCode: "INTTHA0002",
                Language: "EN",
            },
            {
                CompanyCode: "INTVNM0001",
                Language: "EN",
            },
            {
                CompanyCode: "INTTHA0001",
                Language: "TH",
            },
            {
                CompanyCode: "INTTHA0002",
                Language: "TH",
            },
            {
                CompanyCode: "INTVNM0001",
                Language: "VN",
            },
        ]);
    }
}
exports.default = CompanyLanguages1700732658900;
//# sourceMappingURL=1700732658900-companylanguages.js.map