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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const express = __importStar(require("express"));
const promises_1 = require("fs/promises");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const AllExceptionsFilter_1 = require("./middleware/AllExceptionsFilter");
const timeout_interceptor_1 = require("./middleware/timeout.interceptor");
const user_entity_1 = require("./modules/users/entities/user.entity");
const models_1 = require("./swagger/examples/models");
async function bootstrap() {
    const httpsOptions = process.env.HTTPS_CERTIFICATE_FILE &&
        process.env.HTTPS_CERTIFICATE_PASSPHRASE
        ? {
            pfx: await (0, promises_1.readFile)(process.env.HTTPS_CERTIFICATE_FILE),
            passphrase: process.env.HTTPS_CERTIFICATE_PASSPHRASE,
        }
        : null;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions,
        bodyParser: false,
    });
    const configService = app.get(config_1.ConfigService);
    const appConfig = configService.get("app-config");
    app.useBodyParser("json", { limit: "10mb" });
    app.enableCors();
    app.useGlobalInterceptors(new timeout_interceptor_1.TimeoutInterceptor());
    const adapterHost = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter_1.AllExceptionsFilter(adapterHost));
    app.use("/src/swagger/layout", express.static((0, path_1.join)(__dirname, "..", "src/swagger/layout")));
    app.setGlobalPrefix("api/v1/", { exclude: ["/"] });
    const options = new swagger_1.DocumentBuilder()
        .setTitle(appConfig.swaggerTitle)
        .setDescription(appConfig.swaggerDescription)
        .setVersion(appConfig.swaggerVersion)
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options, {
        ignoreGlobalPrefix: false,
        extraModels: [
            models_1.Bookmark,
            models_1.CompanyLanguage,
            models_1.CreateBimSlideResponseDto,
            models_1.CreateCategoryResponseDto,
            models_1.DeleteResultResponseDto,
            models_1.ErrorBadRequestDto,
            models_1.ErrorForbiddenRequestDto,
            models_1.ErrorInternalServerDto,
            models_1.ErrorNotFoundDto,
            models_1.ErrorTooManyRequestsDto,
            models_1.ErrorUnauthorizeRequestDto,
            models_1.ErrorUnprocessableRequestDto,
            models_1.getAllDataTypeResponseDto,
            models_1.GetAllProposalResponseDto,
            models_1.GetEquipmentWithMatchResultResponseDto,
            models_1.GetMonthlySummaryResponseDto,
            models_1.InsertResultResponseDto,
            models_1.LikeToggleResponseDto,
            models_1.ListReleaseToLiveResponseDto,
            models_1.PaginationMetaDto,
            models_1.PendingUser,
            models_1.Proposal,
            models_1.ReleaseSchedule,
            models_1.SectionPaginationDto,
            models_1.SelectProposalResponseDto,
            models_1.UpdateResultResponseDto,
            user_entity_1.User,
            models_1.ValidateModelResponseDto,
        ],
    });
    if (appConfig.disableSwagger === "false") {
        swagger_1.SwaggerModule.setup("docs", app, document, {
            customCssUrl: "/src/swagger/layout/custom-swagger.css",
        });
    }
    const server = await app.listen(appConfig.port || 3001);
    server.setTimeout(30000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map