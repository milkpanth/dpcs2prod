"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proposalsequence_entity_1 = require("../../modules/proposalsequences/entities/proposalsequence.entity");
const proposal_type_enum_1 = require("../../modules/proposals/entities/proposal-type.enum");
class ProposalSequences1700732658889 {
    async run(dataSource) {
        const repository = dataSource.getRepository(proposalsequence_entity_1.ProposalSequence);
        await repository.insert([
            {
                Type: proposal_type_enum_1.ProposalTypeEnum.PROPOSAL,
                Counter: 1,
            },
            {
                Type: proposal_type_enum_1.ProposalTypeEnum.APPLICATION,
                Counter: 1,
            },
        ]);
    }
}
exports.default = ProposalSequences1700732658889;
//# sourceMappingURL=1700732658889-proposalsequences.js.map