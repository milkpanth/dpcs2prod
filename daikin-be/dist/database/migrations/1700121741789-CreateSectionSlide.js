"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSectionSlide1700121741789 = void 0;
const typeorm_1 = require("typeorm");
class CreateSectionSlide1700121741789 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "sectionslides",
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
                    name: "SlideID",
                    type: "int",
                },
            ],
        }), true);
        await queryRunner.createForeignKey("sectionslides", new typeorm_1.TableForeignKey({
            columnNames: ["SectionID"],
            referencedTableName: "sections",
            referencedColumnNames: ["SectionID"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("sectionslides", new typeorm_1.TableForeignKey({
            columnNames: ["SlideID"],
            referencedTableName: "slides",
            referencedColumnNames: ["SlideID"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("sectionslides");
    }
}
exports.CreateSectionSlide1700121741789 = CreateSectionSlide1700121741789;
//# sourceMappingURL=1700121741789-CreateSectionSlide.js.map