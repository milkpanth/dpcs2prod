"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSlideFileArchives1700121741953 = void 0;
const typeorm_1 = require("typeorm");
class CreateSlideFileArchives1700121741953 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "slidefiles_archive",
            columns: [
                {
                    name: "FileID",
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
                    name: "Language",
                    type: "char(2)",
                },
                {
                    name: "Path",
                    type: "text",
                },
                {
                    name: "SlideTotalPage",
                    type: "int",
                    unsigned: true,
                },
                {
                    name: "Version",
                    type: "int",
                    unsigned: true,
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
            ],
        }), true);
        await queryRunner.createForeignKey("slidefiles_archive", new typeorm_1.TableForeignKey({
            columnNames: ["SlideID"],
            referencedTableName: "slides",
            referencedColumnNames: ["SlideID"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("slidefiles_archive");
    }
}
exports.CreateSlideFileArchives1700121741953 = CreateSlideFileArchives1700121741953;
//# sourceMappingURL=1700121741953-CreateSlideFileArchive.js.map