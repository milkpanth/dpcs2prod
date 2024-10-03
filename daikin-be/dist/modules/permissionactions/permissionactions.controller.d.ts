import { UpdatePermissionDto } from "./dto/update-permissionactions.dto";
import { PermissionAction } from "./entities/permission_action.entity";
import { PermissionActionsService } from "./permissionactions.service";
export declare class PermissionActionsController {
    private readonly permissionactionsService;
    constructor(permissionactionsService: PermissionActionsService);
    findAll(): Promise<PermissionAction[]>;
    update(updateArrayPermissionDto: UpdatePermissionDto[]): Promise<import("typeorm").UpdateResult[]>;
}
