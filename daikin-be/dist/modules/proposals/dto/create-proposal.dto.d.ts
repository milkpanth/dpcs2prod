import { ProposalTypeEnum } from '../entities/proposal-type.enum';
export declare class CreateProposalDto {
    ProposalID: string;
    ProjectName: string;
    CustomerName: string;
    ProjectAddress: string;
    Type: ProposalTypeEnum;
    CompanyProfileLanguage: string;
    PDFFile: string;
    PPTXFile: string;
    ExpireDate: string;
    Version: number;
}
