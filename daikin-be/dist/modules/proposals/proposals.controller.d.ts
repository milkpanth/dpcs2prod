import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { Slide } from "../slides/entities/slide.entity";
import { GenerateProposalDto } from "./dto/generate-proposal.dto";
import { GetProposalDto } from "./dto/get-proposal.dto";
import { SelectProposalDto } from "./dto/select-proposal.dto";
import { Proposal } from "./entities/proposal.entity";
import { ProposalService } from "./proposals.service";
export declare class ProposalController {
    private readonly proposalsService;
    constructor(proposalsService: ProposalService);
    findAll(user: GraphUserDto, query: GetProposalDto): Promise<{
        total_count: number;
        result: Proposal[];
    }>;
    downloadPowerpoint(path: string): Promise<import("@nestjs/common").StreamableFile>;
    dropdownMenulist(equipments: string): Promise<any[]>;
    listSelectorProposal(sectionID: number): Promise<Slide[]>;
    findMonthlySummary(user: GraphUserDto): Promise<{
        newProposal: number;
        editProposal: number;
        companyRank: import("./entities/proposal.entity").ProposalRank[];
        selfRank: import("./entities/proposal.entity").ProposalRank;
    }>;
    findOne(id: string): Promise<Proposal>;
    createProposal(user: GraphUserDto, generateProposalDto: GenerateProposalDto): Promise<string>;
    findProposal(user: GraphUserDto, generateProposalDto: SelectProposalDto): Promise<{
        generalFiles: import("../categories/entities/category.entity").Category[];
        applicationFiles: import("../categories/entities/category.entity").Category[];
        equipmentList: import("../categories/entities/category.entity").Category[];
    }>;
}
