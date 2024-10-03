"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateImages1700729746002 = void 0;
const typeorm_1 = require("typeorm");
class CreateImages1700729746002 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "images",
            columns: [
                {
                    name: "ImageID",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "Name",
                    type: "varchar(20)",
                    isUnique: true,
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
                    name: "File",
                    type: "text",
                    isNullable: true,
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
        await queryRunner.dropTable("images");
    }
}
exports.CreateImages1700729746002 = CreateImages1700729746002;
//# sourceMappingURL=1700729746002-CreateImages.js.map