"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSection1700116100112 = void 0;
const typeorm_1 = require("typeorm");
class CreateSection1700116100112 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "sections",
            columns: [
                {
                    name: "SectionID",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "Name",
                    type: "varchar(255)",
                },
                {
                    name: "AlwaysDisplay",
                    type: "boolean",
                },
                {
                    name: "SameName",
                    type: "boolean",
                },
                {
                    name: "Use",
                    type: "enum",
                    enum: ["New", "Using", "Broken", "Deleted", "EOL"],
                },
                {
                    name: "Live",
                    type: "enum",
                    enum: ["New", "Live", "Pending", "Queued", "EOL"],
                },
                {
                    name: "CompanyCode",
                    type: "varchar(255)",
                    isNullable: true,
                },
                {
                    name: "CategoryID",
                    type: "int",
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
        await queryRunner.createForeignKey("sections", new typeorm_1.TableForeignKey({
            columnNames: ["CompanyCode"],
            referencedTableName: "companies",
            referencedColumnNames: ["CompanyCode"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("sections", new typeorm_1.TableForeignKey({
            columnNames: ["CategoryID"],
            referencedTableName: "categories",
            referencedColumnNames: ["CategoryID"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("sections");
    }
}
exports.CreateSection1700116100112 = CreateSection1700116100112;
//# sourceMappingURL=1700116100112-CreateSection.js.map