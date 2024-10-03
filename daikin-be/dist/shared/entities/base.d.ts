import { Live, Use } from "../enum/DataStateEnum";
export declare class BaseEntity {
    CreatedBy?: string;
    UpdatedBy?: string;
    CreatedDate?: Date;
    UpdatedDate?: Date;
    DeletedDate?: Date;
}
export declare class DataStateWithBaseEntity extends BaseEntity {
    Use?: Use;
    Live?: Live;
}
