/// <reference types="multer" />
import type { Response } from "express";
import { CompanyDto } from "../../shared/dto/company-query.dto";
import { DropdownDto } from "../../shared/dto/dropdown-query.dto";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { SlideFile } from "../slidefiles/entities/slidefile.entity";
import { Tag } from "../tags/entities/tag.entity";
import { CreateSlideDto } from "./dto/create-slide.dto";
import { SlidePaginationDto } from "./dto/pagination-slide.dto";
import { QrBimDto } from "./dto/qr-bim.dto";
import { SetSlidePreviousDto } from "./dto/set-slide-previous.dto";
import { UpdateSlideDto } from "./dto/update-slide.dto";
import { Slide } from "./entities/slide.entity";
import { SlidesService } from "./slides.service";
export declare class SlidesController {
    private readonly slidesService;
    constructor(slidesService: SlidesService);
    create(createArraySlideDto: CreateSlideDto[]): Promise<({
        Use: import("../../shared/enum/DataStateEnum").Use;
        Live: import("../../shared/enum/DataStateEnum").Live;
        FileName: string;
        DisplayName: string;
        SectionID: number;
        CompanyCode?: string;
    } & Slide)[]>;
    generateBim(qrData: QrBimDto): Promise<{
        blobName: string;
        jobId: string;
    }>;
    uploadFile(file: Express.Multer.File): Promise<{
        blobName: string;
        jobId: string;
    }>;
    dropdown(user: GraphUserDto, query?: DropdownDto): Promise<Slide[]>;
    slideTags(query?: CompanyDto): Promise<Tag[]>;
    slideThumbnail(id: string): Promise<import("cloudconvert/built/lib/JobsResource").Job>;
    downloadFile(name: string): Promise<import("@nestjs/common").StreamableFile>;
    findAll(graphUser: GraphUserDto, body?: SlidePaginationDto): Promise<import("nestjs-typeorm-paginate").Pagination<Slide, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    downloadPowerpoint(path: string): Promise<import("@nestjs/common").StreamableFile>;
    findByName(searchDto: SearchDto): Promise<Slide[]>;
    findById(slideIdDto: number[]): Promise<Slide[]>;
    update(updateArraySlideDto: UpdateSlideDto[]): Promise<import("typeorm").UpdateResult[]>;
    remove(fileIds: number[]): Promise<import("typeorm").UpdateResult>;
    setPreviousVersion(setSlidePreviousDto: SetSlidePreviousDto): Promise<SlideFile>;
    downloadExcel(user: GraphUserDto, companyQuery: CompanyDto, res: Response): Promise<void>;
}
