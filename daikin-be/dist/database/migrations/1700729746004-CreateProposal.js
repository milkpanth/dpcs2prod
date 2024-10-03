"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedProposal1700729746004 = void 0;
const typeorm_1 = require("typeorm");
class CreatedProposal1700729746004 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "proposals",
            columns: [
                {
                    name: "ProposalID",
                    type: "varchar",
                    isPrimary: true,
                },
                {
                    name: "ProjectName",
                    type: "varchar",
                },
                {
                    name: "CustomerName",
                    type: "varchar",
                },
                {
                    name: "ProjectAddress",
                    type: "varchar",
                },
                {
                    name: "Type",
                    type: "enum",
                    enum: ["PROPOSAL", "APPLICATION"],
                },
                {
                    name: "EquipmentList",
                    type: "longtext",
                    isNullable: true,
                },
                {
                    name: "Version",
                    type: "int",
                    unsigned: true,
                },
                {
                    name: "CompanyProfileLanguage",
                    type: "varchar(2)",
                    isNullable: true,
                },
                {
                    name: "PDFFile",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "PPTXFile",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "ExpireDate",
                    type: "datetime",
                    isNullable: true,
                },
                {
                    name: "Status",
                    type: "ENUM('PENDING','WORKING','ERROR','COMPLETED')",
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("proposals");
    }
}
exports.CreatedProposal1700729746004 = CreatedProposal1700729746004;
//# sourceMappingURL=1700729746004-CreateProposal.js.map