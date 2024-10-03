"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_azure_storage_blob_1 = require("nestjs-azure-storage-blob");
const app_controller_1 = require("./app.controller");
const config_2 = require("./common/config");
const config_live_1 = require("./database/config_live");
const config_use_1 = require("./database/config_use");
const bookmarks_module_1 = require("./modules/bookmarks/bookmarks.module");
const categories_module_1 = require("./modules/categories/categories.module");
const companies_module_1 = require("./modules/companies/companies.module");
const companylanguages_module_1 = require("./modules/companylanguages/companylanguages.module");
const dashboards_module_1 = require("./modules/dashboards/dashboards.module");
const datamanagements_module_1 = require("./modules/datamanagements/datamanagements.module");
const equipmentlists_module_1 = require("./modules/equipmentlists/equipmentlists.module");
const images_module_1 = require("./modules/images/images.module");
const likes_module_1 = require("./modules/likes/likes.module");
const models_module_1 = require("./modules/models/models.module");
const pendingusers_module_1 = require("./modules/pendingusers/pendingusers.module");
const permissionactions_module_1 = require("./modules/permissionactions/permissionactions.module");
const proposals_module_1 = require("./modules/proposals/proposals.module");
const releaseschedules_module_1 = require("./modules/releaseschedules/releaseschedules.module");
const sections_module_1 = require("./modules/sections/sections.module");
const series_module_1 = require("./modules/series/series.module");
const slides_module_1 = require("./modules/slides/slides.module");
const tags_module_1 = require("./modules/tags/tags.module");
const users_module_1 = require("./modules/users/users.module");
const global_guard_1 = require("./shared/guards/global.guard");
const aad_strategy_1 = require("./shared/strategy/aad.strategy");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [".env"],
                load: [
                    config_2.appConfig,
                    config_2.asposeConfig,
                    config_2.azureConfig,
                    config_2.certificateConfig,
                    config_2.databaseConfig,
                ],
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot(config_use_1.useTypeORMModuleConfig),
            typeorm_1.TypeOrmModule.forRoot(config_live_1.liveTypeORMModuleConfig),
            schedule_1.ScheduleModule.forRoot(),
            nestjs_azure_storage_blob_1.AzureStorageBlobModule.register({
                connection: process.env.AZURE_STORAGE_BLOB_CONNECTION,
            }),
            proposals_module_1.ProposalModule,
            companies_module_1.CompaniesModule,
            categories_module_1.CategoriesModule,
            users_module_1.UsersModule,
            pendingusers_module_1.PendingUsersModule,
            tags_module_1.TagsModule,
            slides_module_1.SlidesModule,
            sections_module_1.SectionsModule,
            series_module_1.SeriesModule,
            models_module_1.ModelsModule,
            images_module_1.ImagesModule,
            datamanagements_module_1.DataManagementsModule,
            likes_module_1.LikesModule,
            equipmentlists_module_1.EquipmentListsModule,
            permissionactions_module_1.PermissionActionsModule,
            bookmarks_module_1.BookmarksModule,
            dashboards_module_1.DashboardsModule,
            releaseschedules_module_1.ReleaseScheduleModule,
            companylanguages_module_1.CompanyLanguagesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            aad_strategy_1.AzureADStrategy,
            {
                provide: core_1.APP_GUARD,
                useClass: global_guard_1.GlobalGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map