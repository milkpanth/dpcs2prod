"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSlide1700121741722 = void 0;
const typeorm_1 = require("typeorm");
class CreateSlide1700121741722 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "slides",
            columns: [
                {
                    name: "SlideID",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "FileName",
                    type: "text",
                },
                {
                    name: "DisplayName",
                    type: "varchar(255)",
                },
                {
                    name: "SectionID",
                    type: "int",
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
        await queryRunner.createForeignKey("slides", new typeorm_1.TableForeignKey({
            columnNames: ["CompanyCode"],
            referencedTableName: "companies",
            referencedColumnNames: ["CompanyCode"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("slides", new typeorm_1.TableForeignKey({
            columnNames: ["SectionID"],
            referencedTableName: "sections",
            referencedColumnNames: ["SectionID"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("slides");
    }
}
exports.CreateSlide1700121741722 = CreateSlide1700121741722;
//# sourceMappingURL=1700121741722-CreateSlide.js.map