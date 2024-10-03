"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedBookmark1700729746007 = void 0;
const typeorm_1 = require("typeorm");
class CreatedBookmark1700729746007 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "bookmarks",
            columns: [
                {
                    name: "ID",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "UserMemberID",
                    type: "char(36)",
                },
                {
                    name: "FileID",
                    type: "int",
                },
            ],
        }));
        await queryRunner.createForeignKey("bookmarks", new typeorm_1.TableForeignKey({
            columnNames: ["UserMemberID"],
            referencedTableName: "users",
            referencedColumnNames: ["UserMemberID"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("bookmarks", new typeorm_1.TableForeignKey({
            columnNames: ["FileID"],
            referencedTableName: "slidefiles",
            referencedColumnNames: ["FileID"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("bookmarks");
    }
}
exports.CreatedBookmark1700729746007 = CreatedBookmark1700729746007;
//# sourceMappingURL=1700729746007-CreateBookmark.js.map