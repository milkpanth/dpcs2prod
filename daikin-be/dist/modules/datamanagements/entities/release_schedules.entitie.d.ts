import { DataStateWithBaseEntity } from "../../../shared/entities/base";
export declare class ReleaseSchedules extends DataStateWithBaseEntity {
    ID: number;
    Data: string;
    RunAt: Date;
    Status: string;
}
