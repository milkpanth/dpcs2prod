"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudConvertService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudconvert_1 = __importDefault(require("cloudconvert"));
const AzureStorageEnum_1 = require("../enum/AzureStorageEnum");
const fs_1 = require("fs");
const file_1 = require("../constants/file");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let CloudConvertService = class CloudConvertService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.cloudConvert = new cloudconvert_1.default(this.configService.get("CLOUD_CONVERT_API_KEY"));
        this.azureStorageConfig = this.parseAzureStorageConnectionString(this.configService.get("AZURE_STORAGE_BLOB_CONNECTION"));
    }
    async slideToThumbnail(blobName) {
        return this.cloudConvert.jobs.create({
            tasks: {
                "import-blob": {
                    operation: "import/azure/blob",
                    storage_account: this.azureStorageConfig.AccountName,
                    storage_access_key: this.azureStorageConfig.AccountKey,
                    container: AzureStorageEnum_1.ContainerEnum.Media,
                    blob: blobName,
                },
                "convert-thumbnail": {
                    operation: "convert",
                    input_format: "pptx",
                    output_format: "jpg",
                    input: "import-blob",
                    pixel_density: 300,
                    width: 1280,
                    height: 720,
                },
                "export-blob": {
                    operation: "export/azure/blob",
                    input: "convert-thumbnail",
                    storage_account: this.azureStorageConfig.AccountName,
                    storage_access_key: this.azureStorageConfig.AccountKey,
                    container: AzureStorageEnum_1.ContainerEnum.Screenshot,
                },
            },
        });
    }
    async convertPptxToPdfLocal(pptxFile, pdfFile) {
        console.log("Converting PDF via CloudConvert...");
        const job = await this.cloudConvert.jobs.create({
            tasks: {
                "import-1": {
                    operation: "import/upload",
                },
                "task-1": {
                    operation: "convert",
                    input: ["import-1"],
                    output_format: "pdf",
                },
                "export-1": {
                    operation: "export/url",
                    input: ["task-1"],
                    inline: false,
                    archive_multiple_files: false,
                },
            },
            tag: "jobbuilder",
        });
        const uploadTask = job.tasks.find((task) => task.name === "import-1");
        const inputFile = (0, fs_1.createReadStream)(`${file_1.TEMP_OUTPUT}/${pptxFile}`);
        await this.cloudConvert.tasks.upload(uploadTask, inputFile);
        const finishedJob = await this.cloudConvert.jobs.wait(job.id);
        const fileLists = this.cloudConvert.jobs.getExportUrls(finishedJob);
        const file = fileLists.pop();
        const { data: convertRespose } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(file.url, {
            responseType: "arraybuffer",
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            var _a;
            console.error((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
            throw "Error when download file!";
        })));
        if (!convertRespose) {
            throw Error("No Data!");
        }
        await fs_1.promises.writeFile(`${file_1.TEMP_OUTPUT}/${pdfFile}`, convertRespose);
    }
    async getJobStatus(jobId) {
        return this.cloudConvert.jobs.get(jobId);
    }
    parseAzureStorageConnectionString(connectionString) {
        const parts = connectionString.split(";");
        const parsedValues = {};
        for (const part of parts) {
            const [key, value] = part.trim().split("=");
            parsedValues[key] = value;
        }
        return parsedValues;
    }
};
CloudConvertService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], CloudConvertService);
exports.CloudConvertService = CloudConvertService;
//# sourceMappingURL=cloudconvert.service.js.map