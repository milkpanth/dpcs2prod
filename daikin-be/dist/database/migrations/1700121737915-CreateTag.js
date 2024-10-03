"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTag1700121737915 = void 0;
const typeorm_1 = require("typeorm");
class CreateTag1700121737915 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "tags",
            columns: [
                {
                    name: "TagID",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "Name",
                    type: "varchar(255)",
                    isUnique: true,
                },
                {
                    name: "IsSeriesType",
                    type: "boolean",
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
                    name: "UseCount",
                    type: "bigint(20)",
                    unsigned: true,
                    default: 0,
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable("tags");
    }
}
exports.CreateTag1700121737915 = CreateTag1700121737915;
//# sourceMappingURL=1700121737915-CreateTag.js.map