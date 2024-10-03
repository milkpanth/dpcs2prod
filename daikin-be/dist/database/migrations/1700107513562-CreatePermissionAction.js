"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePermissionAction1700107513562 = void 0;
const typeorm_1 = require("typeorm");
class CreatePermissionAction1700107513562 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "permission_actions",
            columns: [
                {
                    name: "ActionID",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "Role",
                    type: "ENUM('SuperAdmin','GlobalAdmin','GlobalUser','LocalAdmin','LocalUser')",
                },
                {
                    name: "Permission",
                    type: "varchar",
                },
                {
                    name: "Read",
                    type: "boolean",
                },
                {
                    name: "Modify",
                    type: "boolean",
                },
                {
                    name: "Delete",
                    type: "boolean",
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
        await queryRunner.dropTable("permission_actions");
    }
}
exports.CreatePermissionAction1700107513562 = CreatePermissionAction1700107513562;
//# sourceMappingURL=1700107513562-CreatePermissionAction.js.map