import { Repository } from "typeorm";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { Model } from "../models/entities/model.entity";
import { SlideFile } from "../slidefiles/entities/slidefile.entity";
import { RequestEquipmentList } from "./dto/request-equipments.dto";
export declare class EquipmentListsService {
    private readonly modelsRepository;
    private readonly slideFilesRepository;
    constructor(modelsRepository: Repository<Model>, slideFilesRepository: Repository<SlideFile>);
    getMatchResult(graphUser: GraphUserDto, requestEquipments: RequestEquipmentList[]): Promise<{
        equipData: any[];
        languageList: string[];
    }>;
}
