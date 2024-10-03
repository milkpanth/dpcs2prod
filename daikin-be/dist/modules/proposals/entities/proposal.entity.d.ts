import { BaseEntity } from "../../../shared/entities/base";
import { ProposalStatusEnum } from "../../../shared/enum/ProposalStatusEnum";
import { User } from "../../users/entities/user.entity";
import { ProposalTypeEnum } from "./proposal-type.enum";
export declare class Proposal extends BaseEntity {
    ProposalID: string;
    ProjectName: string;
    CustomerName: string;
    ProjectAddress: string;
    Type: ProposalTypeEnum;
    CompanyProfileLanguage: string;
    PDFFile: string;
    PPTXFile: string;
    ExpireDate: Date;
    Status: ProposalStatusEnum;
    EquipmentList?: any[];
    Version: number;
    Owner: User;
}
export declare class ProposalRank {
    "UserID": string;
    "Name": string;
    "Surname": string;
    "TotalCount": number;
    "CompanyRank": number;
}
