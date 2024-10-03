import { UserTypeEnum } from "../../../shared/enum/UserTypeEnum.enum";
export declare class PendingUser {
    ID: number;
    CompanyCode?: string;
    Position?: string;
    Country: string;
    UserMemberName?: string;
    UserMemberSurname?: string;
    UserMemberEmail: string;
    UserMemberPhone?: string;
    Type: UserTypeEnum;
    ApproveStatus?: boolean;
    CreatedBy: string;
    CreatedDate: Date;
    UpdatedBy: string;
    UpdatedDate: Date;
    DeletedDate: Date;
}
