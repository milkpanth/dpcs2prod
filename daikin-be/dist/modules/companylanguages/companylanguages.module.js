"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyLanguagesModule = void 0;
const common_1 = require("@nestjs/common");
const companylanguages_service_1 = require("./companylanguages.service");
const companylanguages_controller_1 = require("./companylanguages.controller");
const typeorm_1 = require("@nestjs/typeorm");
const db_1 = require("../../shared/constants/db");
const companylanguage_entity_1 = require("./entities/companylanguage.entity");
let CompanyLanguagesModule = class CompanyLanguagesModule {
};
CompanyLanguagesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([companylanguage_entity_1.CompanyLanguage], db_1.USE_DB_NAME)],
        controllers: [companylanguages_controller_1.CompanyLanguagesController],
        providers: [companylanguages_service_1.CompanyLanguagesService],
    })
], CompanyLanguagesModule);
exports.CompanyLanguagesModule = CompanyLanguagesModule;
//# sourceMappingURL=companylanguages.module.js.map