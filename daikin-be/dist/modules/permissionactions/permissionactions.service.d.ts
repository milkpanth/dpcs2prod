import { Repository } from "typeorm";
import { UpdatePermissionDto } from "./dto/update-permissionactions.dto";
import { PermissionAction } from "./entities/permission_action.entity";
export declare class PermissionActionsService {
    private readonly usePermissionActionsRepository;
    constructor(usePermissionActionsRepository: Repository<PermissionAction>);
    findAll(): Promise<PermissionAction[]>;
    update(updatePermissionDto: UpdatePermissionDto[]): Promise<import("typeorm").UpdateResult[]>;
}
