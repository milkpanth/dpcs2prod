import { UserTypeEnum } from "../../../shared/enum/UserTypeEnum.enum";
import { User } from "../../users/entities/user.entity";
export declare class PermissionAction {
    ActionID: number;
    Role: UserTypeEnum;
    Permission: string;
    Read: boolean;
    Modify: boolean;
    Delete: boolean;
    User: User;
    Users: User[];
}
