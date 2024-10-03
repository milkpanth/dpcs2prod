import { DeleteResult, FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { AppLoggerService } from "../../shared/app-logger";
import { DataBaseTypeEnum } from "../../shared/enum/database-type.enum";
import { SlideFileArchive } from "../slidefiles/entities/slidefiles_archive.entity";
export declare class SlideFilesArchiveRepository {
    private useSlideRepo;
    private liveSlideRepo;
    private readonly logger;
    constructor(useSlideRepo: Repository<SlideFileArchive>, liveSlideRepo: Repository<SlideFileArchive>, logger: AppLoggerService);
    getLastedVersion(slideId: number, language: string, databaseType: DataBaseTypeEnum): Promise<SlideFileArchive>;
    findOneWithWhereConditions(whereConditions: FindOptionsWhere<SlideFileArchive> | FindOptionsWhere<SlideFileArchive>[], databaseType: DataBaseTypeEnum, relations?: FindOptionsRelations<SlideFileArchive>): Promise<SlideFileArchive>;
    deleteByFileId(fileId: number, databaseType: DataBaseTypeEnum): Promise<DeleteResult>;
    deleteBySlideId(slideId: number, databaseType: DataBaseTypeEnum): Promise<DeleteResult>;
    deleteSlideLessVersion(slideId: number, version: number, databaseType: DataBaseTypeEnum): Promise<DeleteResult>;
}
