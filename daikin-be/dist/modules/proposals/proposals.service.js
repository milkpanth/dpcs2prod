"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const docxtemplater_1 = __importDefault(require("docxtemplater"));
const promises_1 = require("fs/promises");
const nestjs_azure_storage_blob_1 = require("nestjs-azure-storage-blob");
const path_1 = __importStar(require("path"));
const pizzip_1 = __importDefault(require("pizzip"));
const pptx_automizer_1 = __importDefault(require("pptx-automizer"));
const pptxgenjs_1 = __importDefault(require("pptxgenjs"));
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const cloudconvert_service_1 = require("../../shared/cloudconvert/cloudconvert.service");
const db_1 = require("../../shared/constants/db");
const file_1 = require("../../shared/constants/file");
const AzureStorageEnum_1 = require("../../shared/enum/AzureStorageEnum");
const ProposalStatusEnum_1 = require("../../shared/enum/ProposalStatusEnum");
const proposal_helper_1 = require("../../utils/proposal-helper");
const category_entity_1 = require("../categories/entities/category.entity");
const company_entity_1 = require("../companies/entities/company.entity");
const model_entity_1 = require("../models/entities/model.entity");
const proposalsequence_entity_1 = require("../proposalsequences/entities/proposalsequence.entity");
const section_entity_1 = require("../sections/entities/section.entity");
const slidefile_entity_1 = require("../slidefiles/entities/slidefile.entity");
const slide_entity_1 = require("../slides/entities/slide.entity");
const user_entity_1 = require("../users/entities/user.entity");
const proposal_type_enum_1 = require("./entities/proposal-type.enum");
const proposal_entity_1 = require("./entities/proposal.entity");
let ProposalService = class ProposalService {
    constructor(proposalsRepository, proposalSequencesRepository, slideFilesRepository, categoryRepository, slidesRepository, sectionsRepository, modelsRepository, companiesRepository, storageBlobService, cloudConvertService) {
        this.proposalsRepository = proposalsRepository;
        this.proposalSequencesRepository = proposalSequencesRepository;
        this.slideFilesRepository = slideFilesRepository;
        this.categoryRepository = categoryRepository;
        this.slidesRepository = slidesRepository;
        this.sectionsRepository = sectionsRepository;
        this.modelsRepository = modelsRepository;
        this.companiesRepository = companiesRepository;
        this.storageBlobService = storageBlobService;
        this.cloudConvertService = cloudConvertService;
        this.MAX_COUNTER_DIGIT_LIMIT = 8;
        this.applyCoverTemplate = async (pathFile, projectDetail, projectID, user, uid) => {
            console.log("Creating Cover File...");
            const content = await (0, promises_1.readFile)(path_1.default.join(file_1.TEMP_OUTPUT, pathFile), "binary");
            const doc = new docxtemplater_1.default(new pizzip_1.default(content), {
                paragraphLoop: false,
                linebreaks: true,
            });
            doc.render({
                Date: (0, dayjs_1.default)().format("DD.MM.YYYY"),
                ProjectName: projectDetail.ProjectName,
                ProjectAddress: projectDetail.ProjectAddress,
                CustomerName: projectDetail.CustomerName,
                UserFullname: `${user.UserMemberName || ""} ${user.UserMemberSurname || ""}`,
                ProposalNo: projectID,
            });
            const buf = doc.getZip().generate({
                type: "nodebuffer",
                compression: "DEFLATE",
            });
            const coverFileName = `COVER_${uid}`;
            await (0, promises_1.writeFile)(path_1.default.join(file_1.TEMP_OUTPUT, coverFileName), buf);
            return coverFileName;
        };
        this.cleanOldFile = async (directory) => {
            const lists = await (0, promises_1.readdir)(directory);
            for (const item of lists) {
                const filePath = path_1.default.join(directory, item);
                const stats = await (0, promises_1.stat)(filePath);
                if ((0, dayjs_1.default)().diff(stats.birthtime, "hour") > 1) {
                    await (0, promises_1.rm)(filePath);
                }
            }
        };
    }
    create(createProposalDto) {
        return this.proposalsRepository.save(this.proposalsRepository.create(createProposalDto));
    }
    findOne(id) {
        return this.proposalsRepository.findOneBy({ ProposalID: id });
    }
    async findAll(user, query) {
        const { start_date, end_date, limit, offset, search } = query;
        const queryBuilder = this.proposalsRepository
            .createQueryBuilder("proposal")
            .select()
            .orderBy("proposal.CreatedDate", "DESC")
            .where("proposal.CreatedBy = :userId", {
            userId: user.oid,
        });
        if (search) {
            queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where("proposal.ProjectName = :search", {
                    search: `${search}`,
                })
                    .orWhere("proposal.CustomerName = :search", {
                    search: `${search}`,
                })
                    .orWhere("proposal.Version = :search", {
                    search: `${search}`,
                });
            }));
        }
        if (start_date && end_date) {
            const startDate = new Date(start_date);
            const endDate = new Date(end_date);
            queryBuilder.andWhere("proposal.CreatedDate BETWEEN :startDate AND :endDate", {
                startDate,
                endDate,
            });
            const page = offset ? offset : 1;
            const perPage = limit ? limit : 10;
            const skip = (page - 1) * perPage;
            queryBuilder.skip(skip).take(perPage);
        }
        const totalCount = await queryBuilder.getCount();
        const findProposal = await queryBuilder.getMany();
        if (!findProposal || findProposal.length === 0) {
            return { total_count: 0, result: [] };
        }
        return {
            total_count: totalCount,
            result: findProposal,
        };
    }
    async findMonthlySummary(graphUser) {
        const firstDay = (0, dayjs_1.default)().startOf("month").toDate();
        const lastDay = (0, dayjs_1.default)().endOf("month").toDate();
        const UserMemberID = graphUser.oid;
        const newProposal = await this.proposalsRepository
            .createQueryBuilder("proposal")
            .select()
            .where("proposal.CreatedBy = :userId", { userId: UserMemberID })
            .andWhere("proposal.Version = 1")
            .andWhere("proposal.CreatedDate BETWEEN :startDate AND :endDate", {
            startDate: firstDay,
            endDate: lastDay,
        })
            .getCount();
        const editProposal = await this.proposalsRepository
            .createQueryBuilder("proposal")
            .select()
            .where("proposal.CreatedBy = :userId", { userId: UserMemberID })
            .andWhere("proposal.Version != 1")
            .andWhere("proposal.CreatedDate BETWEEN :startDate AND :endDate", {
            startDate: firstDay,
            endDate: lastDay,
        })
            .getCount();
        const companyRank = await this.proposalsRepository
            .createQueryBuilder("proposal")
            .select("proposal.CreatedBy", "UserID")
            .addSelect("users.UserMemberName", "Name")
            .addSelect("users.UserMemberSurName", "Surname")
            .addSelect("COUNT(proposal.CreatedBy) as TotalCount")
            .addSelect("DENSE_RANK() OVER (ORDER BY COUNT(proposal.CreatedBy) DESC)", "CompanyRank")
            .innerJoin(user_entity_1.User, "users", "proposal.CreatedBy = users.UserMemberID")
            .where("proposal.CreatedDate BETWEEN :startDate AND :endDate", {
            startDate: firstDay,
            endDate: lastDay,
        })
            .where("users.CompanyCode = :companyCode", {
            companyCode: graphUser.user.CompanyCode,
        })
            .groupBy("proposal.CreatedBy")
            .getRawMany();
        const selfRank = companyRank.find((r) => r.UserID == UserMemberID);
        return {
            newProposal,
            editProposal,
            companyRank: companyRank.slice(0, 10),
            selfRank,
        };
    }
    async createProposalJob(graphUser, generateProposalDto) {
        const seqNo = await this.proposalSequencesRepository.findOneBy({
            Type: generateProposalDto.Type,
        });
        if (!seqNo) {
            throw Error("No Sequence Number!");
        }
        const seqNoLength = Math.ceil(Math.log10(seqNo.Counter + 1));
        if (seqNoLength >= this.MAX_COUNTER_DIGIT_LIMIT) {
            throw Error("Sequence Number Reach Limit!");
        }
        const proposalID = `${this.getIDPrefix(generateProposalDto.Type)}${seqNo.Counter.toString().padStart(this.MAX_COUNTER_DIGIT_LIMIT, "0")}`;
        await this.proposalSequencesRepository.increment({ Type: generateProposalDto.Type }, "Counter", 1);
        await this.proposalsRepository.save({
            ProposalID: proposalID,
            Status: ProposalStatusEnum_1.ProposalStatusEnum.WORKING,
            Type: generateProposalDto.Type,
            ProjectName: generateProposalDto.ProjectName,
            CustomerName: generateProposalDto.CustomerName,
            ProjectAddress: generateProposalDto.ProjectAddress,
            EquipmentList: generateProposalDto.EquipmentList,
            Version: generateProposalDto.Version,
        });
        this.createProposal(proposalID, generateProposalDto, graphUser);
        return proposalID;
    }
    async createProposal(proposalID, generateProposalDto, graphUser) {
        try {
            const allFiles = await Promise.all(generateProposalDto.SelectedFile.map(async (rf) => {
                var _a, _b;
                if (!(rf.Path || rf.FileID)) {
                    throw new common_1.NotFoundException("Aruguments missing!");
                }
                if (rf.Path) {
                    return Object.assign({ file: rf.Path, fillMode: "" }, rf);
                }
                const fileData = await this.slideFilesRepository.findOne({
                    relations: {
                        Slide: {
                            Section: true,
                        },
                    },
                    where: { FileID: rf.FileID },
                });
                if (!fileData) {
                    throw new common_1.NotFoundException(`File not found ID:${rf.FileID}`);
                }
                return Object.assign({ file: fileData.Path, fillMode: (_b = (_a = fileData === null || fileData === void 0 ? void 0 : fileData.Slide) === null || _a === void 0 ? void 0 : _a.Section) === null || _b === void 0 ? void 0 : _b.Name }, rf);
            }));
            await this.downloadAllFiles(allFiles.map((o) => o.file), AzureStorageEnum_1.ContainerEnum.Media);
            await this.fillSlideData(allFiles, generateProposalDto, proposalID, graphUser.user);
            const pptxFileName = proposalID;
            await (0, proposal_helper_1.mergePPTX)(allFiles, pptxFileName + ".pptx");
            await this.cloudConvertService.convertPptxToPdfLocal(pptxFileName + ".pptx", pptxFileName + ".pdf");
            await this.uploadAllProposalFiles([
                pptxFileName + ".pptx",
                pptxFileName + ".pdf",
            ]);
            await this.proposalsRepository.update({
                ProposalID: proposalID,
            }, {
                PPTXFile: pptxFileName + ".pptx",
                PDFFile: pptxFileName + ".pdf",
                ExpireDate: (0, dayjs_1.default)().add(7, "day").toDate(),
                CreatedBy: graphUser.oid,
                Status: ProposalStatusEnum_1.ProposalStatusEnum.COMPLETED,
            });
        }
        catch (e) {
            console.error(e);
            await this.proposalsRepository.update({
                ProposalID: proposalID,
            }, {
                Status: ProposalStatusEnum_1.ProposalStatusEnum.ERROR,
            });
        }
    }
    async dropdownMenulist(equipments) {
        const resultSeries = await this.slidesRepository.find({
            where: {
                Tags: {
                    Name: (0, typeorm_2.In)(equipments.split(",")),
                },
            },
            relations: {
                Tags: true,
                Section: true,
            },
        });
        const resultSection = await this.sectionsRepository.findAndCount({
            where: {
                SectionID: (0, typeorm_2.In)(resultSeries.map((e) => e.SectionID)),
            },
            relations: {
                Category: {
                    Sections: true,
                },
            },
        });
        const mapResult = [];
        for (let index = 0; index < resultSection[0].length; index++) {
            const section = resultSection[0][index];
            mapResult.push({
                Id: section.Category.CategoryID,
                Name: section.Category.Name,
                Count: resultSection[1],
                Children: await Promise.all(section.Category.Sections.map(async (ch) => {
                    return {
                        Id: ch.SectionID,
                        Name: ch.Name,
                        Count: await Promise.resolve(this.slidesRepository.count({
                            where: { SectionID: ch.SectionID },
                        })),
                    };
                })),
            });
        }
        return mapResult;
    }
    async listSelectorProposal(sectionID) {
        const result = await this.slidesRepository.find({
            relations: {
                SlideFiles: true,
            },
            where: { SectionID: sectionID },
        });
        return result;
    }
    async findProposal(graphUser, generateProposalDto) {
        const keywordFindObjectLocal = generateProposalDto.keyword
            ? {
                Sections: {
                    CompanyCode: generateProposalDto.company,
                    Slides: {
                        SlideFiles: {
                            FileID: (0, typeorm_2.In)(generateProposalDto.matchedFile),
                        },
                        Tags: {
                            Name: (0, typeorm_2.Like)(`%${generateProposalDto.keyword}%`),
                        },
                    },
                },
            }
            : {};
        const keywordFindObjectGlobal = generateProposalDto.keyword
            ? {
                Sections: {
                    CompanyCode: (0, typeorm_2.IsNull)(),
                    Slides: {
                        SlideFiles: {
                            FileID: (0, typeorm_2.In)(generateProposalDto.matchedFile),
                        },
                        Tags: {
                            Name: (0, typeorm_2.Like)(`%${generateProposalDto.keyword}%`),
                        },
                    },
                },
            }
            : {};
        const generalFiles = await this.categoryRepository.find({
            relations: {
                Sections: {
                    Slides: {
                        SlideFiles: true,
                        Tags: true,
                    },
                },
            },
            where: Object.assign({ Name: "General", AlwaysDisplay: true, CompanyCode: (0, typeorm_2.IsNull)() }, keywordFindObjectLocal),
        });
        const applicationFiles = await this.categoryRepository.find({
            relations: {
                Sections: {
                    Slides: {
                        SlideFiles: true,
                        Tags: true,
                    },
                },
            },
            where: [
                Object.assign({ Name: "Application", AlwaysDisplay: true, CompanyCode: generateProposalDto.company }, keywordFindObjectLocal),
                Object.assign({ Name: "Application", AlwaysDisplay: true, CompanyCode: (0, typeorm_2.IsNull)() }, keywordFindObjectLocal),
            ],
        });
        const equipmentList = await this.categoryRepository.find({
            relations: {
                Sections: {
                    Slides: {
                        SlideFiles: true,
                        Tags: true,
                    },
                },
            },
            where: [
                Object.assign({ Sections: {
                        AlwaysDisplay: true,
                        CompanyCode: generateProposalDto.company,
                    } }, keywordFindObjectLocal),
                Object.assign({ Sections: {
                        Slides: {
                            SlideFiles: {
                                FileID: (0, typeorm_2.In)(generateProposalDto.matchedFile),
                            },
                        },
                        CompanyCode: generateProposalDto.company,
                    } }, keywordFindObjectLocal),
                Object.assign({ CompanyCode: (0, typeorm_2.IsNull)(), Sections: {
                        Slides: {
                            SlideFiles: {
                                FileID: (0, typeorm_2.In)(generateProposalDto.matchedFile),
                            },
                        },
                    } }, keywordFindObjectGlobal),
                Object.assign({ CompanyCode: (0, typeorm_2.IsNull)(), Sections: {
                        AlwaysDisplay: true,
                        Slides: {
                            SlideFiles: {
                                FileID: (0, typeorm_2.In)(generateProposalDto.matchedFile),
                            },
                        },
                    } }, keywordFindObjectGlobal),
            ],
        });
        return {
            generalFiles,
            applicationFiles,
            equipmentList,
        };
    }
    async downloadAllFiles(files, container) {
        return Promise.all(files.map(async (file) => {
            const filePath = path_1.default.join(file_1.TEMP_OUTPUT, file);
            return (0, promises_1.stat)(filePath)
                .then((_) => {
                return filePath;
            })
                .catch(async (e) => {
                if (e.code !== "ENOENT")
                    throw e;
                console.log("Downloading:" + file);
                const client = this.storageBlobService
                    .getClient()
                    .getContainerClient(container);
                const blockBlobClient = client.getBlockBlobClient(file);
                await blockBlobClient.downloadToFile(filePath);
                return filePath;
            });
        }));
    }
    async downloadProposal(name) {
        const client = this.storageBlobService
            .getClient()
            .getContainerClient(AzureStorageEnum_1.ContainerEnum.Proposal);
        const blockBlobClient = client.getBlockBlobClient(name);
        const blobResponse = await blockBlobClient.download();
        return new common_1.StreamableFile(blobResponse.readableStreamBody, {
            type: blobResponse.contentType,
        });
    }
    async uploadAllProposalFiles(files) {
        return Promise.all(files.map(async (file) => {
            const filePath = path_1.default.join(file_1.TEMP_OUTPUT, file);
            const client = this.storageBlobService
                .getClient()
                .getContainerClient(AzureStorageEnum_1.ContainerEnum.Proposal);
            const blockBlobClient = client.getBlockBlobClient(file);
            return blockBlobClient.uploadFile(filePath, {
                blobHTTPHeaders: {
                    blobContentType: this.getMimeType((0, path_1.extname)(file)),
                },
            });
        }));
    }
    getMimeType(extension) {
        switch (extension) {
            case ".pdf":
                return "application/pdf";
            case ".pptx":
                return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
            default:
                return "application/octet-stream";
        }
    }
    getIDPrefix(type) {
        switch (type) {
            case proposal_type_enum_1.ProposalTypeEnum.PROPOSAL:
                return "P";
            case proposal_type_enum_1.ProposalTypeEnum.APPLICATION:
                return "G";
            default:
                return "";
        }
    }
    async fillSlideData(allFiles, proposalDetail, proposalID, user) {
        for (const file of allFiles) {
            if (!file.fillMode) {
                continue;
            }
            const tempID = (0, uuid_1.v4)();
            switch (file.fillMode) {
                case "Cover Page":
                    const coverFile = await this.applyCoverTemplate(file.file, proposalDetail, proposalID, user, tempID);
                    const matchCoverIndex = allFiles.findIndex((f) => f.FileID == file.FileID);
                    allFiles[matchCoverIndex].file = coverFile;
                    break;
                case "Equipment Summary":
                    const equipmentFile = await this.fillEquipmentList(file.file, proposalDetail, tempID);
                    const matchEquipIndex = allFiles.findIndex((f) => f.FileID == file.FileID);
                    allFiles[matchEquipIndex].file = equipmentFile;
                    break;
                default:
                    break;
            }
        }
    }
    async fillEquipmentList(pathFile, projectDetail, uid) {
        console.log("Creating Equipment File...");
        const equipData = projectDetail.EquipmentList;
        equipData.sort((a, b) => a.module - b.module);
        const models = await this.modelsRepository.find({
            relations: {
                Image: true,
            },
            where: {
                Name: (0, typeorm_2.In)(equipData.map((e) => e.module)),
                ImageID: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
            },
        });
        await this.cleanOldFile(file_1.TEMP_OUTPUT);
        await this.downloadAllFiles(models.map((m) => m.Image.File), AzureStorageEnum_1.ContainerEnum.Equipment);
        const content = await (0, promises_1.readFile)(path_1.default.join(file_1.TEMP_OUTPUT, pathFile), "binary");
        const doc = new docxtemplater_1.default(new pizzip_1.default(content), {
            paragraphLoop: false,
            linebreaks: true,
        });
        const companyData = await this.companiesRepository.findOneBy({
            CompanyCode: projectDetail.SelectedCompany,
        });
        doc.render({
            CompanyName: companyData ? companyData.Name : "",
        });
        await (0, promises_1.writeFile)(path_1.default.join(file_1.TEMP_OUTPUT, pathFile), doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        }));
        const pres = new pptxgenjs_1.default();
        pres.layout = "LAYOUT_WIDE";
        let start_x = 0.09;
        let start_y = 1.82;
        let nx = 0;
        let ny = 0;
        let multiply = 0;
        let slide = null;
        for (let i = 0; i < equipData.length; i++) {
            if (i % 10 == 0) {
                slide = pres.addSlide();
                start_x = 0.2;
                start_y = 1.88;
                nx = 0;
                ny = 0;
                multiply = 0;
            }
            if (i % 5 == 0 && i % 10 !== 0) {
                nx = 6.49;
                multiply = 0;
            }
            ny = multiply * 0.9;
            multiply++;
            const each = equipData[i];
            slide
                .addText(each.module, {
                w: 2.4,
                h: 0.44,
                x: start_x + nx,
                y: start_y + ny,
                fontFace: "Arial",
                fontSize: 16,
            })
                .addText(`${each.description || ""}`, {
                w: 2.6,
                h: 0.44,
                x: start_x + 3.13 + nx,
                y: start_y + ny,
                fontFace: "Arial",
                fontSize: 16,
            })
                .addText(`${each.qty ? `(${each.qty})` : ""}`, {
                w: 0.6,
                h: 0.44,
                x: start_x + 5.59 + nx,
                y: start_y + ny,
                fontFace: "Arial",
                fontSize: 14,
                align: "center",
            });
            const modelWithImage = models.find((m) => m.Name == each.module);
            if (modelWithImage) {
                slide.addImage({
                    path: `${file_1.TEMP_OUTPUT}/${modelWithImage.Image.File}`,
                    w: 0.54,
                    h: 0.54,
                    x: start_x + 2.2 + nx,
                    y: start_y - 0.07 + ny,
                });
            }
        }
        const noTemplateEquipmentFileName = `NoTemplateEquipment_${uid}.pptx`;
        await pres.writeFile({
            fileName: path_1.default.join(file_1.TEMP_OUTPUT, noTemplateEquipmentFileName),
        });
        const automizer = new pptx_automizer_1.default({
            templateDir: file_1.TEMP_OUTPUT,
            removeExistingSlides: true,
            outputDir: file_1.TEMP_OUTPUT,
        });
        const apres = automizer
            .loadRoot(pathFile)
            .load(pathFile, "base")
            .load(noTemplateEquipmentFileName, "equip");
        const templates = await apres.getInfo();
        const equipNumbers = await apres.getTemplate("equip").getAllSlideNumbers();
        for (const esn of equipNumbers) {
            apres.addSlide("base", 1, (slide) => {
                templates.slideByNumber("equip", esn).elements.forEach((e) => {
                    slide.addElement("equip", esn, e.name);
                });
            });
        }
        const equipmentFileName = `Equipment_${uid}.pptx`;
        await apres.write(equipmentFileName);
        if (pathFile) {
            const filePath = path_1.default.join(file_1.TEMP_OUTPUT, pathFile);
            await (0, promises_1.rm)(filePath);
        }
        return equipmentFileName;
    }
};
ProposalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(proposal_entity_1.Proposal, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(proposalsequence_entity_1.ProposalSequence, db_1.USE_DB_NAME)),
    __param(2, (0, typeorm_1.InjectRepository)(slidefile_entity_1.SlideFile, db_1.LIVE_DB_NAME)),
    __param(3, (0, typeorm_1.InjectRepository)(category_entity_1.Category, db_1.LIVE_DB_NAME)),
    __param(4, (0, typeorm_1.InjectRepository)(slide_entity_1.Slide, db_1.LIVE_DB_NAME)),
    __param(5, (0, typeorm_1.InjectRepository)(section_entity_1.Section, db_1.LIVE_DB_NAME)),
    __param(6, (0, typeorm_1.InjectRepository)(model_entity_1.Model, db_1.LIVE_DB_NAME)),
    __param(7, (0, typeorm_1.InjectRepository)(company_entity_1.Company, db_1.LIVE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        nestjs_azure_storage_blob_1.AzureStorageBlobService,
        cloudconvert_service_1.CloudConvertService])
], ProposalService);
exports.ProposalService = ProposalService;
//# sourceMappingURL=proposals.service.js.map