"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompany1700040928001 = void 0;
const typeorm_1 = require("typeorm");
class CreateCompany1700040928001 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "companies",
            columns: [
                {
                    name: "CompanyCode",
                    type: "varchar(20)",
                    isPrimary: true,
                },
                {
                    name: "Name",
                    type: "varchar(255)",
                },
                {
                    name: "Prefix",
                    type: "varchar(10)",
                    isNullable: true,
                },
                {
                    name: "Abbreviation",
                    type: "varchar(20)",
                    isNullable: true,
                },
                {
                    name: "CreatedDate",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "CreatedBy",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "UpdatedDate",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "UpdatedBy",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "DeletedDate",
                    type: "datetime",
                    isNullable: true,
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("companies");
    }
}
exports.CreateCompany1700040928001 = CreateCompany1700040928001;
//# sourceMappingURL=1700040928001-CreateCompany.js.map