import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
export declare class CloudConvertService {
    private httpService;
    private configService;
    private cloudConvert;
    private azureStorageConfig;
    constructor(httpService: HttpService, configService: ConfigService);
    slideToThumbnail(blobName: string): Promise<import("cloudconvert/built/lib/JobsResource").Job>;
    convertPptxToPdfLocal(pptxFile: string, pdfFile: string): Promise<void>;
    getJobStatus(jobId: string): Promise<import("cloudconvert/built/lib/JobsResource").Job>;
    private parseAzureStorageConnectionString;
}
