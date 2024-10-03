import type { Response } from "express";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { DataManagementsService } from "./datamanagements.service";
import { ListReleaseToLiveDto } from "./dto";
import { ListReleaseToLiveResponseDto } from "./dto/list-release-to-live-response.dto";
import { ScheduleReleaseDto } from "./dto/schedule-release.dto";
export declare class DataManagementsController {
    private readonly dataManagementsService;
    constructor(dataManagementsService: DataManagementsService);
    listReleaseToLive(queryPayload: ListReleaseToLiveDto): Promise<ListReleaseToLiveResponseDto>;
    exportExcelList(res: Response, queryPayload: ListReleaseToLiveDto): Promise<void>;
    doReleaseToLive(user: GraphUserDto, queryPayload: ListReleaseToLiveDto): Promise<void>;
    scheduleRelease(user: GraphUserDto, scheduleReleaseDto: ScheduleReleaseDto, queryPayload: ListReleaseToLiveDto): Promise<void>;
}
