import { ProposalRank } from "../entities/proposal.entity";
export declare class GetMonthlySummaryResponseDto {
    newProposal: number;
    editProposal: number;
    companyRank: ProposalRank[];
    selfRank: ProposalRank;
}
