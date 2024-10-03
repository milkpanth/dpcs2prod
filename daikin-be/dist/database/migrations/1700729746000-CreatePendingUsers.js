"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePendingUsers1700729746000 = void 0;
const typeorm_1 = require("typeorm");
class CreatePendingUsers1700729746000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "pendingusers",
            columns: [
                {
                    name: "ID",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "CompanyCode",
                    type: "varchar(20)",
                    isNullable: true,
                },
                {
                    name: "Position",
                    type: "text",
                    isNullable: true,
                },
                {
                    name: "Country",
                    type: "char(2)",
                },
                {
                    name: "UserMemberName",
                    type: "text",
                    isNullable: true,
                },
                {
                    name: "UserMemberSurname",
                    type: "text",
                    isNullable: true,
                },
                {
                    name: "UserMemberEmail",
                    type: "varchar(255)",
                },
                {
                    name: "UserMemberPhone",
                    type: "varchar(255)",
                    isNullable: true,
                },
                {
                    name: "ApproveStatus",
                    type: "boolean",
                    isNullable: true,
                },
                {
                    name: "Type",
                    type: "ENUM('SuperAdmin','GlobalAdmin','GlobalUser','LocalAdmin','LocalUser')",
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
        await queryRunner.createForeignKey("pendingusers", new typeorm_1.TableForeignKey({
            columnNames: ["CompanyCode"],
            referencedTableName: "companies",
            referencedColumnNames: ["CompanyCode"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("pendingusers");
    }
}
exports.CreatePendingUsers1700729746000 = CreatePendingUsers1700729746000;
//# sourceMappingURL=1700729746000-CreatePendingUsers.js.map