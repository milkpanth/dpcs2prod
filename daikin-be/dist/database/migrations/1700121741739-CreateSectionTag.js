"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSectionTag1700121741739 = void 0;
const typeorm_1 = require("typeorm");
class CreateSectionTag1700121741739 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "sectiontags",
            columns: [
                {
                    name: "ID",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "SectionID",
                    type: "int",
                },
                {
                    name: "TagID",
                    type: "int",
                },
            ],
        }), true);
        await queryRunner.createForeignKey("sectiontags", new typeorm_1.TableForeignKey({
            columnNames: ["SectionID"],
            referencedTableName: "sections",
            referencedColumnNames: ["SectionID"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("sectiontags", new typeorm_1.TableForeignKey({
            columnNames: ["TagID"],
            referencedTableName: "tags",
            referencedColumnNames: ["TagID"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("sectiontags");
    }
}
exports.CreateSectionTag1700121741739 = CreateSectionTag1700121741739;
//# sourceMappingURL=1700121741739-CreateSectionTag.js.map