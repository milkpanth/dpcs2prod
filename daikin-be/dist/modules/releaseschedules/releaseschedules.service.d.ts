import { Repository } from "typeorm";
import { CreateReleaseScheduleDto } from "./dto/create-releaseschedule.dto";
import { ReleaseSchedule } from "./entities/releaseschedule.entity";
import { SchedulerRegistry } from "@nestjs/schedule";
import { GraphUserDto } from "src/shared/msgraph/dto/graph-user.dto";
import { DataManagementsService } from "../datamanagements/datamanagements.service";
import { ListReleaseToLiveDto } from "../datamanagements/dto";
export declare class ReleaseScheduleService {
    private readonly releaseSchedulesRepository;
    private readonly connection;
    private readonly connectionLive;
    private schedulerRegistry;
    private readonly dataManagementsService;
    private readonly logger;
    constructor(releaseSchedulesRepository: Repository<ReleaseSchedule>, connection: any, connectionLive: any, schedulerRegistry: SchedulerRegistry, dataManagementsService: DataManagementsService);
    create(user: GraphUserDto, createReleaseScheduleDto: CreateReleaseScheduleDto, queryPayload: ListReleaseToLiveDto): Promise<ReleaseSchedule>;
    list(): Promise<ReleaseSchedule[]>;
    remove(ID: number): Promise<import("typeorm").DeleteResult>;
    private addCronJob;
    private removeCronJob;
    private scheduleTaskAtSpecificDate;
    private scheduleTaskAtSpecificDateCancel;
    private formatDate;
    private formatDateAT;
}
