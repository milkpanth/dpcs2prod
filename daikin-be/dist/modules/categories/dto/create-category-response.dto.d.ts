import { Live, Use } from "../../../shared/enum/DataStateEnum";
export declare class CreateCategoryResponseDto {
    CategoryID: number;
    CompanyCode?: string;
    Name: string;
    SameName: boolean;
    AlwaysDisplay: boolean;
    Use: Use;
    Live: Live;
    CreatedBy?: string;
    UpdatedBy?: string;
    DeletedDate?: Date;
    CreatedDate: Date;
    UpdatedDate: Date;
}
