"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSlideTag1700121741951 = void 0;
const typeorm_1 = require("typeorm");
class CreateSlideTag1700121741951 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "slidetags",
            columns: [
                {
                    name: "ID",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "SlideID",
                    type: "int",
                },
                {
                    name: "TagID",
                    type: "int",
                },
            ],
        }), true);
        await queryRunner.createForeignKey("slidetags", new typeorm_1.TableForeignKey({
            columnNames: ["SlideID"],
            referencedTableName: "slides",
            referencedColumnNames: ["SlideID"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("slidetags", new typeorm_1.TableForeignKey({
            columnNames: ["TagID"],
            referencedTableName: "tags",
            referencedColumnNames: ["TagID"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("slidetags");
    }
}
exports.CreateSlideTag1700121741951 = CreateSlideTag1700121741951;
//# sourceMappingURL=1700121741951-CreateSlideTag.js.map