"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModels1700729746003 = void 0;
const typeorm_1 = require("typeorm");
class CreateModels1700729746003 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "models",
            columns: [
                {
                    name: "Name",
                    type: "varchar(20)",
                    isPrimary: true,
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
                    name: "SeriesName",
                    type: "varchar(20)",
                    isNullable: true,
                },
                {
                    name: "ImageID",
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
        await queryRunner.createForeignKey("models", new typeorm_1.TableForeignKey({
            columnNames: ["SeriesName"],
            referencedTableName: "series",
            referencedColumnNames: ["Name"],
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("models", new typeorm_1.TableForeignKey({
            columnNames: ["ImageID"],
            referencedTableName: "images",
            referencedColumnNames: ["ImageID"],
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("models");
    }
}
exports.CreateModels1700729746003 = CreateModels1700729746003;
//# sourceMappingURL=1700729746003-CreateModels.js.map