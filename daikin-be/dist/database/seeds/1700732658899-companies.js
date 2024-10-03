"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const company_entity_1 = require("../../modules/companies/entities/company.entity");
const user_1 = require("../../shared/constants/user");
class Companies1700732658889 {
    async run(dataSource) {
        const repository = dataSource.getRepository(company_entity_1.Company);
        await repository.insert([
            {
                CompanyCode: user_1.MS_GRAPH_DEFAULT_COMPANY_CODE,
                Abbreviation: user_1.MS_GRAPH_DEFAULT_COMPANY_ABBR,
                Name: user_1.MS_GRAPH_DEFAULT_COMPANY_NAME,
            },
            {
                CompanyCode: "INTAUS0001",
                Name: "Daikin Australia Pty., Ltd.",
                Abbreviation: "DAS",
            },
            {
                CompanyCode: "INTIDN0001",
                Name: "PT. Daikin Airconditioning Indonesia",
                Abbreviation: "DID",
            },
            {
                CompanyCode: "INTMYS0001",
                Name: "Daikin Malaysia Sales & Service Sdn. Bhd.",
                Abbreviation: "DMSS",
            },
            {
                CompanyCode: "INTMYS0002",
                Name: "Daikin Malaysia Sdn. Bhd.",
                Abbreviation: "DAMA",
            },
            {
                CompanyCode: "INTNZL0001",
                Name: "Daikin Airconditioning New Zealand Ltd.",
                Abbreviation: "DNZ",
            },
            {
                CompanyCode: "INTPHL0001",
                Name: "Daikin Airconditioning Philippines, Inc.",
                Abbreviation: "DPH",
            },
            {
                CompanyCode: "INTSGP0001",
                Name: "Daikin Airconditioning (Singapore) Pte. Ltd.",
                Abbreviation: "DSP",
            },
            {
                CompanyCode: "INTTHA0001",
                Name: "Daikin Industries (Thailand) Ltd",
                Abbreviation: "DIT",
            },
            {
                CompanyCode: "INTTHA0002",
                Name: "Siam Daikin Sales Co., Ltd.",
                Abbreviation: "SDS",
            },
            {
                CompanyCode: "INTVNM0001",
                Name: "Daikin Air Conditioning (Vietnam) Joint Stock Company",
                Abbreviation: "DAV",
            },
        ]);
    }
}
exports.default = Companies1700732658889;
//# sourceMappingURL=1700732658899-companies.js.map