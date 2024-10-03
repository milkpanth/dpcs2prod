import { BaseEntity } from "typeorm";
export declare class EntityHelper extends BaseEntity {
    __entity?: string;
    setEntityName(): void;
    toJSON(): Record<string, any>;
}
export declare const escapeLikeString: (raw: string) => string;
