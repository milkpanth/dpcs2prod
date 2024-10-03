import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { RequestEquipmentList } from "./dto/request-equipments.dto";
import { EquipmentListsService } from "./equipmentlists.service";
export declare class EquipmentListsController {
    private readonly equipmentsService;
    constructor(equipmentsService: EquipmentListsService);
    update(graphUser: GraphUserDto, requestEquipmentLists: RequestEquipmentList[]): Promise<{
        equipData: any[];
        languageList: string[];
    }>;
}
