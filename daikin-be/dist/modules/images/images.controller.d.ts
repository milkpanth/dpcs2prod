/// <reference types="multer" />
import type { Response } from "express";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { CreateImageDto } from "./dto/create-image.dto";
import { ExportModelLinkImageDto } from "./dto/export-modellink.dto";
import { UpdateImageDto } from "./dto/update-image.dto";
import { Image } from "./entities/image.entity";
import { ImagesService } from "./images.service";
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    create(createArrayImageDto: CreateImageDto[]): Promise<({
        Use: import("../../shared/enum/DataStateEnum").Use;
        Live: import("../../shared/enum/DataStateEnum").Live;
        UseCount: number;
        Name: string;
        File?: string;
    } & Image)[]>;
    uploadFile(file: Express.Multer.File): Promise<string>;
    dropdown(): Promise<Image[]>;
    downloadFile(name: string): Promise<import("@nestjs/common").StreamableFile>;
    findAll(query?: PaginationDto): Promise<import("nestjs-typeorm-paginate").Pagination<Image, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findById(id: number): Promise<Image>;
    findByName(searchDto: SearchDto): Promise<Image[]> | Promise<Image>;
    update(updateArrayImageDto: UpdateImageDto[]): Promise<import("typeorm").UpdateResult[]>;
    remove(ids: number[]): Promise<import("typeorm").UpdateResult>;
    download(res: Response): Promise<void>;
    modelLinkEditImage(exportModelLinkImageDto: ExportModelLinkImageDto, res: Response): Promise<void>;
}
