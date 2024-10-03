"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser1700040928775 = void 0;
const typeorm_1 = require("typeorm");
class CreateUser1700040928775 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "users",
            columns: [
                {
                    name: "UserMemberID",
                    type: "char(36)",
                    isPrimary: true,
                },
                {
                    name: "CompanyCode",
                    type: "varchar(20)",
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
                    name: "UserMemberStatus",
                    type: "boolean",
                },
                {
                    name: "Type",
                    type: "ENUM('SuperAdmin','GlobalAdmin','GlobalUser','LocalAdmin','LocalUser')",
                },
                {
                    name: "RecentLogin",
                    type: "datetime",
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
        await queryRunner.createForeignKey("users", new typeorm_1.TableForeignKey({
            columnNames: ["CompanyCode"],
            referencedTableName: "companies",
            referencedColumnNames: ["CompanyCode"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("users");
    }
}
exports.CreateUser1700040928775 = CreateUser1700040928775;
//# sourceMappingURL=1700040928775-CreateUser.js.map