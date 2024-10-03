import { UserTypeEnum } from "../../../shared/enum/UserTypeEnum.enum";
import { Company } from "../../companies/entities/company.entity";
import { PermissionAction } from "../../permissionactions/entities/permission_action.entity";
export declare class User {
    UserMemberID: string;
    CompanyCode?: string;
    Position?: string;
    Country: string;
    UserMemberName?: string;
    UserMemberSurname?: string;
    UserMemberEmail: string;
    UserMemberPhone?: string;
    UserMemberStatus: boolean;
    Type: UserTypeEnum;
    RecentLogin: Date;
    CreatedBy: string;
    CreatedDate: Date;
    UpdatedBy: string;
    UpdatedDate: Date;
    DeletedDate: Date;
    PermissionActions: PermissionAction[];
    PermissionAction: PermissionAction;
    Company: Company;
}
