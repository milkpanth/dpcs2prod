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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exceljs_1 = require("exceljs");
const path_1 = require("path");
const typeorm_2 = require("typeorm");
const section_entity_1 = require("../../modules/sections/entities/section.entity");
const db_1 = require("../../shared/constants/db");
const database_type_enum_1 = require("../../shared/enum/database-type.enum");
const DataStateEnum_1 = require("../../shared/enum/DataStateEnum");
const UserTypeEnum_enum_1 = require("../../shared/enum/UserTypeEnum.enum");
const before_update_status_inlive_1 = require("../../utils/before-update-status-inlive");
const before_update_status_inuse_1 = require("../../utils/before-update-status-inuse");
const company_helper_1 = require("../../utils/company-helper");
const validators_1 = require("../../utils/validators");
const categories_repository_1 = require("../categories/categories.repository");
const category_entity_1 = require("../categories/entities/category.entity");
const company_entity_1 = require("../companies/entities/company.entity");
const tags_service_1 = require("../tags/tags.service");
const sections_repository_1 = require("./sections.repository");
let SectionsService = class SectionsService {
    constructor(useSectionsRepository, liveSectionsRepository, useCompanyRepository, useCategoryRepository, dataSource, tagsService, sectionRepo, categoryRepo) {
        this.useSectionsRepository = useSectionsRepository;
        this.liveSectionsRepository = liveSectionsRepository;
        this.useCompanyRepository = useCompanyRepository;
        this.useCategoryRepository = useCategoryRepository;
        this.dataSource = dataSource;
        this.tagsService = tagsService;
        this.sectionRepo = sectionRepo;
        this.categoryRepo = categoryRepo;
    }
    async create(graphUser, createArraySectionDto) {
        return await this.dataSource.transaction(async (manager) => {
            const relatedTag = new Set();
            const allCreateSection = await Promise.all(createArraySectionDto.map(async (d) => {
                const { SelectedTag, CategoryID } = d, data = __rest(d, ["SelectedTag", "CategoryID"]);
                if (graphUser.user.CompanyCode != data.CompanyCode &&
                    ![UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN, UserTypeEnum_enum_1.UserTypeEnum.SUPERADMIN].includes(graphUser.user.Type)) {
                    throw new common_1.ForbiddenException("Not your Company!");
                }
                const isExist = await manager.existsBy(section_entity_1.Section, {
                    Name: data.Name,
                    CompanyCode: data.CompanyCode || (0, typeorm_2.IsNull)(),
                });
                if (isExist) {
                    throw new common_1.BadRequestException("Duplicate!");
                }
                const companyArray = [];
                if (data.SameName &&
                    [UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN, UserTypeEnum_enum_1.UserTypeEnum.SUPERADMIN].includes(graphUser.user.Type)) {
                    const allCompany = await manager.find(company_entity_1.Company);
                    allCompany.forEach((c) => companyArray.push(c));
                    (0, company_helper_1.appendGlobalCompany)(companyArray);
                }
                else {
                    companyArray.push({ CompanyCode: data.CompanyCode });
                }
                return Promise.all(companyArray.flatMap(async (c) => {
                    const isMatchSelectCompany = c.CompanyCode == data.CompanyCode ||
                        (c.CompanyCode == null && !data.CompanyCode);
                    const whereConditions = {
                        Name: data.Name,
                        CompanyCode: !c.CompanyCode || c.CompanyCode === ""
                            ? (0, typeorm_2.IsNull)()
                            : c.CompanyCode,
                    };
                    const duplicateSection = await this.sectionRepo.findOneWithWhereConditions(whereConditions, database_type_enum_1.DataBaseTypeEnum.USE);
                    if (duplicateSection)
                        return;
                    const section = await manager.save(section_entity_1.Section, Object.assign(Object.assign({}, data), { CompanyCode: c.CompanyCode === "" ? null : c.CompanyCode, Use: CategoryID && isMatchSelectCompany ? DataStateEnum_1.Use.New : DataStateEnum_1.Use.Broken, Live: DataStateEnum_1.Live.New, CategoryID: isMatchSelectCompany ? CategoryID : null }));
                    if (isMatchSelectCompany) {
                        await manager
                            .createQueryBuilder()
                            .relation(section_entity_1.Section, "Tags")
                            .of(section)
                            .add(SelectedTag);
                    }
                    if (data.SameName === false) {
                        await manager
                            .createQueryBuilder()
                            .relation(section_entity_1.Section, "Tags")
                            .of(section.SectionID)
                            .addAndRemove(SelectedTag, section.Tags);
                    }
                    if (CategoryID) {
                        const categories = await this.useCategoryRepository.findOne({
                            where: { CategoryID: CategoryID },
                        });
                        await manager.update(category_entity_1.Category, { CategoryID }, {
                            Use: (0, validators_1.getInUseStatus)(categories.Live, categories.Use),
                            Live: (0, validators_1.getInLiveStatus)(categories.Live),
                        });
                    }
                    SelectedTag.forEach(relatedTag.add, relatedTag);
                    return section;
                }));
            }));
            await this.tagsService.updateTagCounter(manager, relatedTag);
            return allCreateSection;
        });
    }
    async findAll(graphUser, queryPayload) {
        if (graphUser.user.CompanyCode != queryPayload.company &&
            ![UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN, UserTypeEnum_enum_1.UserTypeEnum.SUPERADMIN].includes(graphUser.user.Type)) {
            throw new common_1.ForbiddenException("Not your Company!");
        }
        const dbType = queryPayload.live
            ? database_type_enum_1.DataBaseTypeEnum.LIVE
            : database_type_enum_1.DataBaseTypeEnum.USE;
        let sectionList = await this.sectionRepo.findAll(queryPayload, graphUser, dbType);
        if (sectionList.meta.totalItems > 0 && sectionList.items.length === 0) {
            queryPayload.page = 1;
            sectionList = await this.sectionRepo.findAll(queryPayload, graphUser, dbType);
        }
        return sectionList;
    }
    findById(id) {
        return this.useSectionsRepository.findOne({
            relations: {
                Tags: true,
                Category: true,
            },
            where: {
                SectionID: id,
            },
        });
    }
    findSectionByName(graphUser, searchDto) {
        return this.useSectionsRepository.find({
            relations: {
                Tags: true,
                Category: true,
            },
            where: Object.assign({ Name: searchDto.exact
                    ? searchDto.keyword
                    : (0, typeorm_2.Like)(`%${searchDto.keyword}%`) }, (0, company_helper_1.companyWhereFilter)(graphUser.user, searchDto.company || (0, typeorm_2.IsNull)())),
        });
    }
    async update(graphUser, updateArraySectionDto) {
        return await this.dataSource.transaction(async (manager) => {
            const relatedTag = new Set();
            const allUpdateSection = await Promise.all(updateArraySectionDto.map(async (d) => {
                const { SelectedTag, IsEOL: IsEndOfLive, CategoryID } = d, data = __rest(d, ["SelectedTag", "IsEOL", "CategoryID"]);
                if (graphUser.user.CompanyCode != data.CompanyCode &&
                    ![UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN, UserTypeEnum_enum_1.UserTypeEnum.SUPERADMIN].includes(graphUser.user.Type)) {
                    throw new common_1.ForbiddenException("Not your Company!");
                }
                const section = await manager.findOne(section_entity_1.Section, {
                    relations: { Tags: true },
                    where: { SectionID: data.SectionID },
                });
                const category = await this.categoryRepo.findOneWithWhereConditions({ CategoryID: !CategoryID ? (0, typeorm_2.IsNull)() : CategoryID }, database_type_enum_1.DataBaseTypeEnum.USE);
                if (!CategoryID) {
                    const category = await this.categoryRepo.findOneWithWhereConditions({ CategoryID: section.CategoryID }, database_type_enum_1.DataBaseTypeEnum.USE);
                    const sectionList = await this.sectionRepo.findWithWhereConditions({ CategoryID: section.CategoryID }, database_type_enum_1.DataBaseTypeEnum.USE);
                    const isMatched = sectionList.filter((sec) => sec.CategoryID === section.CategoryID)
                        .length === 1;
                    if (section.CategoryID) {
                        await this.categoryRepo.insertOrUpsert({
                            CategoryID: category.CategoryID,
                            Use: sectionList.length === 0 || isMatched
                                ? (0, validators_1.getInUseStatusWithDeletedOrBroken)(category.Use)
                                : (0, validators_1.getInUseStatus)(category.Live, category.Use),
                            Live: (0, validators_1.getInLiveStatus)(category.Live),
                        }, database_type_enum_1.DataBaseTypeEnum.USE);
                    }
                }
                else {
                    if (section.CategoryID !== null &&
                        CategoryID !== section.CategoryID) {
                        const category = await this.categoryRepo.findOneWithWhereConditions({ CategoryID: section.CategoryID }, database_type_enum_1.DataBaseTypeEnum.USE);
                        await this.categoryRepo.insertOrUpsert({
                            CategoryID: section.CategoryID,
                            Use: (0, validators_1.getInUseStatusWithDeletedOrBroken)(category.Use),
                            Live: (0, validators_1.getInLiveStatus)(category.Live),
                        }, database_type_enum_1.DataBaseTypeEnum.USE);
                    }
                    await this.categoryRepo.insertOrUpsert({
                        CategoryID: CategoryID,
                        Use: (0, validators_1.getInUseStatus)(category.Live, category.Use),
                        Live: (0, validators_1.getInLiveStatus)(category.Live),
                    }, database_type_enum_1.DataBaseTypeEnum.USE);
                }
                if ((section.SameName == false &&
                    data.SameName == true &&
                    [UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN, UserTypeEnum_enum_1.UserTypeEnum.SUPERADMIN].includes(graphUser.user.Type)) ||
                    section === undefined) {
                    const allCompany = await manager.find(company_entity_1.Company);
                    (0, company_helper_1.appendGlobalCompany)(allCompany);
                    const companies = (0, company_helper_1.filterCompanyList)(allCompany, data.CompanyCode);
                    for (const c of companies) {
                        const whereConditions = {
                            Name: data.Name,
                            CompanyCode: !c.CompanyCode || c.CompanyCode === ""
                                ? (0, typeorm_2.IsNull)()
                                : c.CompanyCode,
                        };
                        const duplicateSection = await this.sectionRepo.findOneWithWhereConditions(whereConditions, database_type_enum_1.DataBaseTypeEnum.USE);
                        if (duplicateSection)
                            continue;
                        const { SectionID } = data, newSectionData = __rest(data, ["SectionID"]);
                        const sectionCompany = await manager.save(section_entity_1.Section, {
                            Name: newSectionData.Name,
                            SameName: true,
                            AlwaysDisplay: false,
                            Use: DataStateEnum_1.Use.Broken,
                            Live: DataStateEnum_1.Live.New,
                            CompanyCode: c.CompanyCode === "" ? null : c.CompanyCode,
                        });
                        if (!data.SameName) {
                            await manager
                                .createQueryBuilder()
                                .relation(section_entity_1.Section, "Tags")
                                .of(sectionCompany.SectionID)
                                .add(SelectedTag);
                        }
                    }
                }
                await manager
                    .createQueryBuilder()
                    .relation(section_entity_1.Section, "Tags")
                    .of(section.SectionID)
                    .addAndRemove(SelectedTag, section.Tags);
                section.Tags.forEach((ct) => relatedTag.add(ct.TagID));
                SelectedTag.forEach((st) => relatedTag.add(st));
                return await manager.update(section_entity_1.Section, {
                    SectionID: data.SectionID,
                }, Object.assign(Object.assign({}, data), { CategoryID, Use: (0, before_update_status_inuse_1.beforeUpdateStatusInUse)(CategoryID, section.Live, IsEndOfLive), Live: (0, before_update_status_inlive_1.beforeUpdateStatusInLive)(CategoryID, section.Live) }));
            }));
            await this.tagsService.updateTagCounter(manager, relatedTag);
            return allUpdateSection;
        });
    }
    async remove(graphUser, ids) {
        return await this.dataSource.transaction(async (manager) => {
            const removeSectionWork = await manager.findBy(section_entity_1.Section, {
                SectionID: (0, typeorm_2.In)(ids),
                Use: (0, typeorm_2.In)([DataStateEnum_1.Use.New, DataStateEnum_1.Use.Broken]),
                Live: (0, typeorm_2.In)([DataStateEnum_1.Live.New]),
            });
            const relatedCategory = await manager.findBy(section_entity_1.Section, Object.assign({ SectionID: (0, typeorm_2.In)(ids) }, (0, company_helper_1.companyWhereFilter)(graphUser.user)));
            for (const section of relatedCategory) {
                const category = await this.categoryRepo.findById(section.CategoryID, database_type_enum_1.DataBaseTypeEnum.USE);
                const sectionList = await this.sectionRepo.findWithWhereConditions({ CategoryID: section.CategoryID, Use: (0, typeorm_2.Not)(DataStateEnum_1.Use.Deleted) }, database_type_enum_1.DataBaseTypeEnum.USE);
                if (section.CategoryID) {
                    await this.categoryRepo.insertOrUpsert(Object.assign(Object.assign({ CategoryID: section.CategoryID }, (0, company_helper_1.companyWhereFilter)(graphUser.user)), { Use: sectionList.length <= 1
                            ? (0, validators_1.getInUseStatusWithDeletedOrBroken)(category.Use)
                            : (0, validators_1.getInUseStatus)(category.Live, category.Use), Live: (0, validators_1.getInLiveStatus)(category.Live) }), database_type_enum_1.DataBaseTypeEnum.USE);
                }
            }
            await manager.remove(removeSectionWork);
            const allDeleteSection = await manager.update(section_entity_1.Section, Object.assign({ SectionID: (0, typeorm_2.In)(ids), Live: (0, typeorm_2.In)([DataStateEnum_1.Live.Live, DataStateEnum_1.Live.Pending]) }, (0, company_helper_1.companyWhereFilter)(graphUser.user)), {
                CategoryID: null,
                Use: DataStateEnum_1.Use.Deleted,
                Live: DataStateEnum_1.Live.Pending,
            });
            const relatedTag = new Set();
            relatedCategory === null || relatedCategory === void 0 ? void 0 : relatedCategory.forEach((s) => {
                var _a;
                (_a = s === null || s === void 0 ? void 0 : s.Tags) === null || _a === void 0 ? void 0 : _a.forEach((t) => relatedTag.add(t === null || t === void 0 ? void 0 : t.TagID));
            });
            await this.tagsService.updateTagCounter(manager, relatedTag);
            return allDeleteSection;
        });
    }
    async dropdown(graphUser, query) {
        return await this.useSectionsRepository.find({
            relations: {
                Tags: true,
                Category: true,
            },
            where: (0, company_helper_1.companyWhereFilter)(graphUser.user, query.company || (0, typeorm_2.IsNull)()),
        });
    }
    async download(graphUser, companyQuery, res) {
        const getTagNameAtIndex = (tags, index) => {
            const tag = tags.at(index);
            return tag ? tag.Name : "";
        };
        const data = await this.useSectionsRepository.find({
            where: (0, company_helper_1.companyWhereFilter)(graphUser.user, companyQuery.company || (0, typeorm_2.IsNull)()),
            relations: {
                Category: true,
                Tags: true,
            },
        });
        const company = await this.useCompanyRepository.findOneBy((0, company_helper_1.companyWhereFilter)(graphUser.user, companyQuery.company || (0, typeorm_2.IsNull)()));
        const workbook = new exceljs_1.Workbook();
        await workbook.xlsx.readFile((0, path_1.resolve)("templates", "exports", "20231112_Download_Section_V0.1a.xlsx"));
        const worksheet = workbook.getWorksheet(1);
        const timeCell = worksheet.getCell("F1");
        timeCell.value = new Date();
        const libCell = worksheet.getCell("C1");
        libCell.value = company ? company.Abbreviation : "GLOBAL";
        const startRow = 5;
        data.forEach((r, i) => {
            worksheet.insertRow(startRow + i, [
                i + 1,
                r.Name || "",
                r.AlwaysDisplay ? "Y" : "N",
                r.SameName ? "Y" : "N",
                r.Use,
                r.Live,
                r.Category ? r.Category.Name : "",
                getTagNameAtIndex(r.Tags, 0),
                getTagNameAtIndex(r.Tags, 1),
                getTagNameAtIndex(r.Tags, 2),
                getTagNameAtIndex(r.Tags, 3),
                getTagNameAtIndex(r.Tags, 4),
                "",
                r.UpdatedDate,
            ]);
            worksheet.getRow(startRow + i).getCell(14).numFmt =
                "dd/mmm/yyyy hh:mm:ss";
        });
        return workbook.xlsx.write(res);
    }
    async sectionTags(companyDto) {
        const tagsArray = new Array();
        const matchSections = await this.useSectionsRepository.find({
            select: ["SectionID"],
            relations: {
                Tags: true,
            },
            where: {
                CompanyCode: companyDto.company || (0, typeorm_2.IsNull)(),
            },
        });
        matchSections.forEach((s) => {
            s.Tags.forEach((t) => {
                if (!tagsArray.some((at) => at.TagID == t.TagID)) {
                    tagsArray.push(t);
                }
            });
        });
        tagsArray.sort((a, b) => (a.TagID > b.TagID ? 1 : -1));
        return tagsArray;
    }
};
SectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(section_entity_1.Section, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(section_entity_1.Section, db_1.LIVE_DB_NAME)),
    __param(2, (0, typeorm_1.InjectRepository)(company_entity_1.Company, db_1.USE_DB_NAME)),
    __param(3, (0, typeorm_1.InjectRepository)(category_entity_1.Category, db_1.USE_DB_NAME)),
    __param(4, (0, typeorm_1.InjectDataSource)(db_1.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        tags_service_1.TagsService,
        sections_repository_1.SectionsRepository,
        categories_repository_1.CategoriesRepository])
], SectionsService);
exports.SectionsService = SectionsService;
//# sourceMappingURL=sections.service.js.map