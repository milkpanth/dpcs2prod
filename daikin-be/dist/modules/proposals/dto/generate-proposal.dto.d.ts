import { ProposalTypeEnum } from "../entities/proposal-type.enum";
export declare class SelectedSlideFileDto {
    FileID: number;
    Page: number;
    Path: string;
}
export declare class GenerateProposalDto {
    Type: ProposalTypeEnum;
    ProjectName: string;
    CustomerName: string;
    ProjectAddress: string;
    SelectedFile: SelectedSlideFileDto[];
    EquipmentList: any[];
    Version: number;
    SelectedCompany: string;
}
