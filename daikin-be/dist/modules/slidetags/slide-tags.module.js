"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlideTagsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_logger_1 = require("../../shared/app-logger");
const db_1 = require("../../shared/constants/db");
const slide_entity_1 = require("../slides/entities/slide.entity");
const tag_entity_1 = require("../tags/entities/tag.entity");
const slidetag_entity_1 = require("./entities/slidetag.entity");
const slide_tags_repository_1 = require("./slide-tags.repository");
let SlideTagsModule = class SlideTagsModule {
};
SlideTagsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_logger_1.AppLoggerModule,
            typeorm_1.TypeOrmModule.forFeature([tag_entity_1.Tag, slide_entity_1.Slide, slidetag_entity_1.SlideTag], db_1.USE_DB_NAME),
            typeorm_1.TypeOrmModule.forFeature([tag_entity_1.Tag, slide_entity_1.Slide, slidetag_entity_1.SlideTag], db_1.LIVE_DB_NAME),
        ],
        controllers: [],
        providers: [slide_tags_repository_1.SlideTagsRepository],
        exports: [slide_tags_repository_1.SlideTagsRepository],
    })
], SlideTagsModule);
exports.SlideTagsModule = SlideTagsModule;
//# sourceMappingURL=slide-tags.module.js.map