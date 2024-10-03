/// <reference types="multer" />
/// <reference types="node" />
import { StreamableFile } from "@nestjs/common";
import { AzureStorageBlobService } from "nestjs-azure-storage-blob";
import { Pagination } from "nestjs-typeorm-paginate";
import { Stream } from "stream";
import { DataSource, EntityManager, Repository } from "typeorm";
import { PaginationDto } from "../../shared/dto/pagination-query.dto";
import { SearchDto } from "../../shared/dto/search-query.dto";
import { Live, Use } from "../../shared/enum/DataStateEnum";
import { ModelRepository } from "../models/model.repository";
import { CreateImageDto } from "./dto/create-image.dto";
import { ExportModelLinkImageDto } from "./dto/export-modellink.dto";
import { UpdateImageDto } from "./dto/update-image.dto";
import { Image } from "./entities/image.entity";
import { ImagesRepository } from "./images.repository";
export declare class ImagesService {
    private readonly useImagesRepository;
    private readonly liveImagesRepository;
    private readonly storageBlobService;
    private dataSource;
    private readonly imageRepo;
    private readonly modelRepo;
    constructor(useImagesRepository: Repository<Image>, liveImagesRepository: Repository<Image>, storageBlobService: AzureStorageBlobService, dataSource: DataSource, imageRepo: ImagesRepository, modelRepo: ModelRepository);
    create(createArrayImageDto: CreateImageDto[]): Promise<({
        Use: Use;
        Live: Live;
        UseCount: number;
        Name: string;
        File?: string;
    } & Image)[]>;
    findAll(queryPayload: PaginationDto): Promise<Pagination<Image>>;
    findById(id: number): Promise<Image>;
    findImageByName(searchDto: SearchDto): Promise<Image[]> | Promise<Image>;
    update(updateArrayImageDto: UpdateImageDto[]): Promise<import("typeorm").UpdateResult[]>;
    remove(ids: number[]): Promise<import("typeorm").UpdateResult>;
    upload(file: Express.Multer.File): Promise<string>;
    downloadImage(name: string): Promise<StreamableFile>;
    download(res: Stream): Promise<void>;
    exportModelLinkEditImage(res: Stream, exportModelLinkImageDto: ExportModelLinkImageDto): Promise<void>;
    dropdown(): Promise<Image[]>;
    updateImageCounter(entityManager: EntityManager, imageToUpdate: Set<number>): Promise<void>;
}
