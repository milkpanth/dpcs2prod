"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserLogsTable1727685140226 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserLogsTable1727685140226 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "userlogs",
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
                    type: "varchar(50)",
                },
                {
                    name: "IPAddress",
                    type: "varchar(255)",
                },
                {
                    name: "Function",
                    type: "varchar(255)",
                },
                {
                    name: "Detail",
                    type: "varchar(255)",
                },
                {
                    name: "CreatedDate",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "UpdatedDate",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP",
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("userlogs");
    }
}
exports.CreateUserLogsTable1727685140226 = CreateUserLogsTable1727685140226;
//# sourceMappingURL=1727685140226-CreateUserLogsTable.ts.js.map