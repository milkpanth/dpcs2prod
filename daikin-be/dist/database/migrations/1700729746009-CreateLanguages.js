"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompanyLanguages1700729746009 = void 0;
const typeorm_1 = require("typeorm");
class CreateCompanyLanguages1700729746009 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "companylanguages",
            columns: [
                {
                    name: "ID",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "CompanyCode",
                    type: "varchar(20)",
                },
                {
                    name: "Language",
                    type: "char(2)",
                },
            ],
        }));
        await queryRunner.createForeignKey("companylanguages", new typeorm_1.TableForeignKey({
            columnNames: ["CompanyCode"],
            referencedTableName: "companies",
            referencedColumnNames: ["CompanyCode"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createIndex("companylanguages", new typeorm_1.TableIndex({
            columnNames: ["CompanyCode", "Language"],
            isUnique: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("companylanguages");
    }
}
exports.CreateCompanyLanguages1700729746009 = CreateCompanyLanguages1700729746009;
//# sourceMappingURL=1700729746009-CreateLanguages.js.map