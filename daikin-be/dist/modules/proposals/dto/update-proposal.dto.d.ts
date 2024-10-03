import { CreateProposalDto } from './create-proposal.dto';
declare const UpdateProposalDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateProposalDto, "ProposalID">>>;
export declare class UpdateProposalDto extends UpdateProposalDto_base {
}
export {};
