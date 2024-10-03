import { DeleteResult, Repository } from "typeorm";
import { AppLoggerService } from "../../shared/app-logger";
import { DataBaseTypeEnum } from "../../shared/enum/database-type.enum";
import { SlideFile } from "../slidefiles/entities/slidefile.entity";
export declare class SlideFilesRepository {
    private useSlideRepo;
    private liveSlideRepo;
    private readonly logger;
    constructor(useSlideRepo: Repository<SlideFile>, liveSlideRepo: Repository<SlideFile>, logger: AppLoggerService);
    insertOrUpsert(slideFile: SlideFile, databaseType: DataBaseTypeEnum): Promise<SlideFile>;
    deleteBySlideId(slideId: number, databaseType: DataBaseTypeEnum): Promise<DeleteResult>;
}
