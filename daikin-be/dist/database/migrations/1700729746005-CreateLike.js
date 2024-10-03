"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedLike1700729746005 = void 0;
const typeorm_1 = require("typeorm");
class CreatedLike1700729746005 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "likes",
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
        await queryRunner.createForeignKey("likes", new typeorm_1.TableForeignKey({
            columnNames: ["UserMemberID"],
            referencedTableName: "users",
            referencedColumnNames: ["UserMemberID"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("likes", new typeorm_1.TableForeignKey({
            columnNames: ["FileID"],
            referencedTableName: "slidefiles",
            referencedColumnNames: ["FileID"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("likes");
    }
}
exports.CreatedLike1700729746005 = CreatedLike1700729746005;
//# sourceMappingURL=1700729746005-CreateLike.js.map