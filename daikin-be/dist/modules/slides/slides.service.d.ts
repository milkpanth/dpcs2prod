/// <reference types="multer" />
/// <reference types="node" />
import { StreamableFile } from "@nestjs/common";
import { AzureStorageBlobService } from "nestjs-azure-storage-blob";
import { Pagination } from "nestjs-typeorm-paginate";
import { Stream } from "stream";
import { DataSource, Repository } from "typeorm";
import { CloudConvertService } from "../../shared/cloudconvert/cloudconvert.service";
import { CompanyDto } from "../../shared/dto/company-query.dto";
import { DropdownDto } from "../../shared/dto/dropdown-query.dto";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { Live, Use } from "../../shared/enum/DataStateEnum";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { Company } from "../companies/entities/company.entity";
import { SlideFile } from "../slidefiles/entities/slidefile.entity";
import { SlideFileArchive } from "../slidefiles/entities/slidefiles_archive.entity";
import { Tag } from "../tags/entities/tag.entity";
import { TagsService } from "../tags/tags.service";
import { CreateSlideDto } from "./dto/create-slide.dto";
import { SlidePaginationDto } from "./dto/pagination-slide.dto";
import { QrBimDto } from "./dto/qr-bim.dto";
import { SetSlidePreviousDto } from "./dto/set-slide-previous.dto";
import { UpdateSlideDto } from "./dto/update-slide.dto";
import { Slide } from "./entities/slide.entity";
import { SlideFilesArchiveRepository } from "./slide-files-archive.repository";
import { SlideFilesRepository } from "./slide-files.repository";
import { SlidesRepository } from "./slides.repository";
export declare class SlidesService {
    private readonly useSlidesRepository;
    private readonly liveSlidesRepository;
    private readonly useSlideFilesRepository;
    private readonly useSlideFileArchivesRepository;
    private readonly useCompanyRepository;
    private dataSource;
    private storageBlobService;
    private cloudConvertService;
    private tagsService;
    private readonly slideRepo;
    private readonly slideFilesRepo;
    private readonly slideFilesArchiveRepo;
    constructor(useSlidesRepository: Repository<Slide>, liveSlidesRepository: Repository<Slide>, useSlideFilesRepository: Repository<SlideFile>, useSlideFileArchivesRepository: Repository<SlideFileArchive>, useCompanyRepository: Repository<Company>, dataSource: DataSource, storageBlobService: AzureStorageBlobService, cloudConvertService: CloudConvertService, tagsService: TagsService, slideRepo: SlidesRepository, slideFilesRepo: SlideFilesRepository, slideFilesArchiveRepo: SlideFilesArchiveRepository);
    create(createArraySlideDto: CreateSlideDto[]): Promise<({
        Use: Use;
        Live: Live;
        FileName: string;
        DisplayName: string;
        SectionID: number;
        CompanyCode?: string;
    } & Slide)[]>;
    findAll(graphUser: GraphUserDto, queryPayload: SlidePaginationDto): Promise<Pagination<Slide>>;
    findSlideByName(searchDto: SearchDto): Promise<Slide[]>;
    findSlideById(ids: number[]): Promise<Slide[]>;
    update(updateArraySlideDto: UpdateSlideDto[]): Promise<import("typeorm").UpdateResult[]>;
    remove(fileIds: number[]): Promise<import("typeorm").UpdateResult>;
    rollbackToPreviousVersion(setSlidePreviousDto: SetSlidePreviousDto): Promise<SlideFile>;
    upload(file: Express.Multer.File): Promise<{
        blobName: string;
        jobId: string;
    }>;
    getSlideToThumbnailStatus(jobId: string): Promise<import("cloudconvert/built/lib/JobsResource").Job>;
    downloadThumbnail(name: string): Promise<StreamableFile>;
    downloadSlide(name: string): Promise<StreamableFile>;
    download(graphUser: GraphUserDto, companyQuery: CompanyDto, res: Stream): Promise<void>;
    dropdown(graphUser: GraphUserDto, query: DropdownDto): Promise<Slide[]>;
    slideTags(companyDto: CompanyDto): Promise<Tag[]>;
    createBimSlide(qrBimDto: QrBimDto): Promise<{
        blobName: string;
        jobId: string;
    }>;
    private createBIMSlide;
}
