"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedReleaseSchedule1700729746008 = void 0;
const typeorm_1 = require("typeorm");
class CreatedReleaseSchedule1700729746008 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "release_schedules",
            columns: [
                {
                    name: "ID",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "Data",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "RunAt",
                    type: "datetime",
                    isNullable: false,
                },
                {
                    name: "Status",
                    type: "varchar",
                    isNullable: false,
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("release_schedules");
    }
}
exports.CreatedReleaseSchedule1700729746008 = CreatedReleaseSchedule1700729746008;
//# sourceMappingURL=1700729746008-CreateReleaseSchedule.js.map