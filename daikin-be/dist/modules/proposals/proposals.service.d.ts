import { StreamableFile } from "@nestjs/common";
import { AzureStorageBlobService } from "nestjs-azure-storage-blob";
import { Repository } from "typeorm";
import { CloudConvertService } from "../../shared/cloudconvert/cloudconvert.service";
import { ContainerEnum } from "../../shared/enum/AzureStorageEnum";
import { GraphUserDto } from "../../shared/msgraph/dto/graph-user.dto";
import { Category } from "../categories/entities/category.entity";
import { Company } from "../companies/entities/company.entity";
import { Model } from "../models/entities/model.entity";
import { ProposalSequence } from "../proposalsequences/entities/proposalsequence.entity";
import { Section } from "../sections/entities/section.entity";
import { SlideFile } from "../slidefiles/entities/slidefile.entity";
import { Slide } from "../slides/entities/slide.entity";
import { User } from "../users/entities/user.entity";
import { CreateProposalDto } from "./dto/create-proposal.dto";
import { GenerateProposalDto } from "./dto/generate-proposal.dto";
import { GetProposalDto } from "./dto/get-proposal.dto";
import { SelectProposalDto } from "./dto/select-proposal.dto";
import { ProposalTypeEnum } from "./entities/proposal-type.enum";
import { Proposal, ProposalRank } from "./entities/proposal.entity";
export declare class ProposalService {
    private readonly proposalsRepository;
    private readonly proposalSequencesRepository;
    private readonly slideFilesRepository;
    private readonly categoryRepository;
    private readonly slidesRepository;
    private readonly sectionsRepository;
    private readonly modelsRepository;
    private readonly companiesRepository;
    private storageBlobService;
    private cloudConvertService;
    constructor(proposalsRepository: Repository<Proposal>, proposalSequencesRepository: Repository<ProposalSequence>, slideFilesRepository: Repository<SlideFile>, categoryRepository: Repository<Category>, slidesRepository: Repository<Slide>, sectionsRepository: Repository<Section>, modelsRepository: Repository<Model>, companiesRepository: Repository<Company>, storageBlobService: AzureStorageBlobService, cloudConvertService: CloudConvertService);
    create(createProposalDto: CreateProposalDto): Promise<Proposal>;
    findOne(id: string): Promise<Proposal>;
    findAll(user: GraphUserDto, query: GetProposalDto): Promise<{
        total_count: number;
        result: Proposal[];
    }>;
    findMonthlySummary(graphUser: GraphUserDto): Promise<{
        newProposal: number;
        editProposal: number;
        companyRank: ProposalRank[];
        selfRank: ProposalRank;
    }>;
    private MAX_COUNTER_DIGIT_LIMIT;
    createProposalJob(graphUser: GraphUserDto, generateProposalDto: GenerateProposalDto): Promise<string>;
    createProposal(proposalID: string, generateProposalDto: GenerateProposalDto, graphUser: GraphUserDto): Promise<void>;
    dropdownMenulist(equipments: string): Promise<any[]>;
    listSelectorProposal(sectionID: number): Promise<Slide[]>;
    findProposal(graphUser: GraphUserDto, generateProposalDto: SelectProposalDto): Promise<{
        generalFiles: Category[];
        applicationFiles: Category[];
        equipmentList: Category[];
    }>;
    downloadAllFiles(files: string[], container: ContainerEnum): Promise<string[]>;
    downloadProposal(name: string): Promise<StreamableFile>;
    uploadAllProposalFiles(files: string[]): Promise<(import("@azure/storage-blob").BlockBlobUploadHeaders & {
        _response: import("@azure/core-http").HttpResponse;
    })[]>;
    getMimeType(extension: string): "application/pdf" | "application/vnd.openxmlformats-officedocument.presentationml.presentation" | "application/octet-stream";
    getIDPrefix(type: ProposalTypeEnum): "" | "P" | "G";
    fillSlideData(allFiles: {
        FileID: number;
        Page: number;
        Path: string;
        file: string;
        fillMode?: string;
    }[], proposalDetail: GenerateProposalDto, proposalID: string, user: User): Promise<void>;
    applyCoverTemplate: (pathFile: string, projectDetail: GenerateProposalDto, projectID: string, user: User, uid: string) => Promise<string>;
    fillEquipmentList(pathFile: string, projectDetail: GenerateProposalDto, uid: string): Promise<string>;
    cleanOldFile: (directory: string) => Promise<void>;
}
