import { BaseEntity } from "../../../shared/entities/base";
export declare class ReleaseSchedule extends BaseEntity {
    ID: number;
    Data?: any[];
    RunAt: Date;
    Status: string;
}
