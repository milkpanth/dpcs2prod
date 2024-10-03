"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalModule = void 0;
const common_1 = require("@nestjs/common");
const proposals_service_1 = require("./proposals.service");
const proposals_controller_1 = require("./proposals.controller");
const typeorm_1 = require("@nestjs/typeorm");
const proposal_entity_1 = require("./entities/proposal.entity");
const user_entity_1 = require("../users/entities/user.entity");
const db_1 = require("../../shared/constants/db");
const slidefile_entity_1 = require("../slidefiles/entities/slidefile.entity");
const slidefiles_archive_entity_1 = require("../slidefiles/entities/slidefiles_archive.entity");
const cloudconvert_module_1 = require("../../shared/cloudconvert/cloudconvert.module");
const slide_entity_1 = require("../slides/entities/slide.entity");
const category_entity_1 = require("../categories/entities/category.entity");
const series_entity_1 = require("../series/entities/series.entity");
const section_entity_1 = require("../sections/entities/section.entity");
const like_entity_1 = require("../likes/entities/like.entity");
const proposalsequence_entity_1 = require("../proposalsequences/entities/proposalsequence.entity");
const bookmark_entity_1 = require("../bookmarks/entities/bookmark.entity");
const model_entity_1 = require("../models/entities/model.entity");
const company_entity_1 = require("../companies/entities/company.entity");
let ProposalModule = class ProposalModule {
};
ProposalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                model_entity_1.Model,
                proposal_entity_1.Proposal,
                proposalsequence_entity_1.ProposalSequence,
                user_entity_1.User,
                slide_entity_1.Slide,
                slidefile_entity_1.SlideFile,
                slidefiles_archive_entity_1.SlideFileArchive,
                category_entity_1.Category,
                series_entity_1.Series,
                section_entity_1.Section,
                like_entity_1.Like,
                bookmark_entity_1.Bookmark,
                company_entity_1.Company,
            ], db_1.USE_DB_NAME),
            typeorm_1.TypeOrmModule.forFeature([
                model_entity_1.Model,
                proposal_entity_1.Proposal,
                proposalsequence_entity_1.ProposalSequence,
                user_entity_1.User,
                slide_entity_1.Slide,
                slidefile_entity_1.SlideFile,
                slidefiles_archive_entity_1.SlideFileArchive,
                category_entity_1.Category,
                series_entity_1.Series,
                section_entity_1.Section,
                like_entity_1.Like,
                bookmark_entity_1.Bookmark,
                company_entity_1.Company,
            ], db_1.LIVE_DB_NAME),
            cloudconvert_module_1.CloudConvertModule,
        ],
        controllers: [proposals_controller_1.ProposalController],
        providers: [proposals_service_1.ProposalService],
        exports: [proposals_service_1.ProposalService],
    })
], ProposalModule);
exports.ProposalModule = ProposalModule;
//# sourceMappingURL=proposals.module.js.map