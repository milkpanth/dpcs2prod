"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategory1700115333119 = void 0;
const typeorm_1 = require("typeorm");
class CreateCategory1700115333119 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "categories",
            columns: [
                {
                    name: "CategoryID",
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
                    name: "SameName",
                    type: "boolean",
                },
                {
                    name: "AlwaysDisplay",
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
        await queryRunner.createForeignKey("categories", new typeorm_1.TableForeignKey({
            columnNames: ["CompanyCode"],
            referencedTableName: "companies",
            referencedColumnNames: ["CompanyCode"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("categories");
    }
}
exports.CreateCategory1700115333119 = CreateCategory1700115333119;
//# sourceMappingURL=1700115333119-CreateCategory.js.map