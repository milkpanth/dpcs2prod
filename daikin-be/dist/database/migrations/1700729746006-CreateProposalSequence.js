"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProposalSequence1700729746006 = void 0;
const typeorm_1 = require("typeorm");
class CreateProposalSequence1700729746006 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "proposalsequences",
            columns: [
                {
                    name: "Type",
                    type: "varchar(50)",
                    isPrimary: true,
                },
                {
                    name: "Counter",
                    type: "int",
                    unsigned: true,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("proposalsequences");
    }
}
exports.CreateProposalSequence1700729746006 = CreateProposalSequence1700729746006;
//# sourceMappingURL=1700729746006-CreateProposalSequence.js.map