import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { ListReleaseToLiveDto } from "../datamanagements/dto";
import { CreateReleaseScheduleDto } from "./dto/create-releaseschedule.dto";
import { ReleaseSchedule } from "./entities/releaseschedule.entity";
import { ReleaseScheduleService } from "./releaseschedules.service";
export declare class ReleaseScheduleController {
    private readonly releaseSchedulesService;
    constructor(releaseSchedulesService: ReleaseScheduleService);
    create(user: GraphUserDto, createReleaseScheduleDto: CreateReleaseScheduleDto, queryPayload: ListReleaseToLiveDto): Promise<ReleaseSchedule>;
    list(): Promise<ReleaseSchedule[]>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
