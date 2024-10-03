import { UserTypeEnum } from "../../../shared/enum/UserTypeEnum.enum";
export declare class CreatePendingUserDto {
    CompanyCode?: string;
    Position: string;
    Country: string;
    Type: UserTypeEnum;
    UserMemberName: string;
    UserMemberSurname: string;
    UserMemberEmail: string;
    UserMemberPhone: string;
}
