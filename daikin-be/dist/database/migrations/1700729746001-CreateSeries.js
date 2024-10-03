"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSeries1700729746001 = void 0;
const typeorm_1 = require("typeorm");
class CreateSeries1700729746001 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "series",
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
                    name: "SeriesType",
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
        await queryRunner.createForeignKey("series", new typeorm_1.TableForeignKey({
            columnNames: ["SeriesType"],
            referencedTableName: "tags",
            referencedColumnNames: ["TagID"],
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("series");
    }
}
exports.CreateSeries1700729746001 = CreateSeries1700729746001;
//# sourceMappingURL=1700729746001-CreateSeries.js.map