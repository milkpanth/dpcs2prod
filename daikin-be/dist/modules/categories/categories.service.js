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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exceljs_1 = require("exceljs");
const path_1 = require("path");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../../modules/categories/entities/category.entity");
const db_1 = require("../../shared/constants/db");
const database_type_enum_1 = require("../../shared/enum/database-type.enum");
const DataStateEnum_1 = require("../../shared/enum/DataStateEnum");
const UserTypeEnum_enum_1 = require("../../shared/enum/UserTypeEnum.enum");
const before_update_status_inlive_1 = require("../../utils/before-update-status-inlive");
const before_update_status_inuse_1 = require("../../utils/before-update-status-inuse");
const company_helper_1 = require("../../utils/company-helper");
const validators_1 = require("../../utils/validators");
const company_entity_1 = require("../companies/entities/company.entity");
const section_entity_1 = require("../sections/entities/section.entity");
const sections_repository_1 = require("../sections/sections.repository");
const db_2 = require("./../../shared/constants/db");
const DataStateEnum_2 = require("./../../shared/enum/DataStateEnum");
const categories_repository_1 = require("./categories.repository");
let CategoriesService = class CategoriesService {
    constructor(useCategoriesRepository, liveCategoriesRepository, useCompanyRepository, useSectionRepository, liveSectionRepository, dataSource, categoryRepo, sectionRepo) {
        this.useCategoriesRepository = useCategoriesRepository;
        this.liveCategoriesRepository = liveCategoriesRepository;
        this.useCompanyRepository = useCompanyRepository;
        this.useSectionRepository = useSectionRepository;
        this.liveSectionRepository = liveSectionRepository;
        this.dataSource = dataSource;
        this.categoryRepo = categoryRepo;
        this.sectionRepo = sectionRepo;
    }
    async create(graphUser, createArrayCategoryDto) {
        return await this.dataSource.transaction(async (manager) => await Promise.all(createArrayCategoryDto.map(async (d) => {
            const { SelectedSection, BrokenSection } = d, data = __rest(d, ["SelectedSection", "BrokenSection"]);
            const sectionIdList = SelectedSection;
            if (graphUser.user.CompanyCode != data.CompanyCode &&
                ![UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN, UserTypeEnum_enum_1.UserTypeEnum.SUPERADMIN].includes(graphUser.user.Type)) {
                throw new common_1.ForbiddenException("Not your Company!");
            }
            const isExist = await manager.existsBy(category_entity_1.Category, {
                Name: data.Name,
                CompanyCode: data.CompanyCode || (0, typeorm_2.IsNull)(),
            });
            if (isExist) {
                throw new common_1.BadRequestException("Duplicate!");
            }
            if (BrokenSection.length > 0) {
                await manager
                    .createQueryBuilder()
                    .relation(section_entity_1.Section, "Category")
                    .of(BrokenSection)
                    .set(null);
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
                if (c.CompanyCode == "") {
                    c.CompanyCode = null;
                }
                const isMatchCompanyList = c.CompanyCode == data.CompanyCode ||
                    (c.CompanyCode == null && !data.CompanyCode);
                const whereConditions = {
                    Name: data.Name,
                    CompanyCode: !c.CompanyCode || c.CompanyCode === ""
                        ? (0, typeorm_2.IsNull)()
                        : c.CompanyCode,
                };
                const duplicateCategory = await this.categoryRepo.findOneWithWhereConditions(whereConditions, database_type_enum_1.DataBaseTypeEnum.USE);
                if (duplicateCategory)
                    return;
                const category = await manager.save(category_entity_1.Category, Object.assign(Object.assign({}, data), { CompanyCode: c.CompanyCode === "" ? null : c.CompanyCode, Use: isMatchCompanyList && sectionIdList.length > 0
                        ? DataStateEnum_2.Use.New
                        : DataStateEnum_2.Use.Broken, Live: DataStateEnum_1.Live.New }));
                const sectionList = await this.useSectionRepository.find({
                    where: { SectionID: (0, typeorm_2.In)(sectionIdList) },
                });
                if (isMatchCompanyList) {
                    for (const section of sectionList) {
                        let category = await this.categoryRepo.findOneWithWhereConditions({
                            Sections: {
                                SectionID: section.SectionID,
                            },
                        }, database_type_enum_1.DataBaseTypeEnum.USE, { Sections: true });
                        if (category) {
                            category =
                                await this.categoryRepo.findOneWithWhereConditions({
                                    CategoryID: category.CategoryID,
                                }, database_type_enum_1.DataBaseTypeEnum.USE, { Sections: true });
                            if (category) {
                                await manager.update(category_entity_1.Category, { CategoryID: category.CategoryID }, {
                                    Use: category.Sections.length <= 1
                                        ? (0, validators_1.getInUseStatusWithDeletedOrBroken)(category.Use)
                                        : (0, validators_1.getInUseStatus)(category.Live, category.Use),
                                    Live: (0, validators_1.getInLiveStatus)(category.Live),
                                });
                            }
                        }
                        if (sectionIdList.some((id) => id !== section.SectionID)) {
                            continue;
                        }
                        await manager.update(section_entity_1.Section, { SectionID: section.SectionID }, {
                            Use: (0, validators_1.getInUseStatus)(section.Live, section.Use),
                            Live: (0, validators_1.getInLiveStatus)(section.Live),
                        });
                    }
                    await manager
                        .createQueryBuilder()
                        .relation(section_entity_1.Section, "Category")
                        .of(sectionIdList)
                        .set(category);
                }
                return category;
            }));
        })));
    }
    async findAll(graphUser, queryPayload) {
        if (graphUser.user.CompanyCode != queryPayload.company &&
            ![UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN, UserTypeEnum_enum_1.UserTypeEnum.SUPERADMIN].includes(graphUser.user.Type)) {
            throw new common_1.ForbiddenException("Not your Company!");
        }
        const dbType = queryPayload.live
            ? database_type_enum_1.DataBaseTypeEnum.LIVE
            : database_type_enum_1.DataBaseTypeEnum.USE;
        let categoryList = await this.categoryRepo.findAll(queryPayload, graphUser, dbType);
        if (categoryList.meta.totalItems > 0 && categoryList.items.length === 0) {
            queryPayload.page = 1;
            categoryList = await this.categoryRepo.findAll(queryPayload, graphUser, dbType);
        }
        return categoryList;
    }
    async findById(id) {
        const relations = {
            Sections: true,
        };
        return await this.categoryRepo.findById(id, database_type_enum_1.DataBaseTypeEnum.USE, relations);
    }
    async findCategoryByName(graphUser, searchDto) {
        let result;
        let whereConditions;
        let relations = {
            Sections: true,
        };
        if (searchDto.exact) {
            whereConditions = Object.assign({ Name: searchDto.keyword }, (0, company_helper_1.companyWhereFilter)(graphUser.user, searchDto.company || (0, typeorm_2.IsNull)()));
            result = await this.categoryRepo.findOneWithWhereConditions(whereConditions, database_type_enum_1.DataBaseTypeEnum.USE, relations);
        }
        else {
            whereConditions = Object.assign({ Name: (0, typeorm_2.Like)(`%${searchDto.keyword}%`) }, (0, company_helper_1.companyWhereFilter)(graphUser.user, searchDto.company || (0, typeorm_2.IsNull)()));
            result = await this.categoryRepo.findWithWhereConditions(whereConditions, database_type_enum_1.DataBaseTypeEnum.USE, relations);
        }
        return result;
    }
    async update(graphUser, updateArrayCategoryDto) {
        return await this.dataSource.transaction(async (manager) => {
            return await Promise.all(updateArrayCategoryDto.map(async (d) => {
                const { SelectedSection, BrokenSection, IsEOL } = d, data = __rest(d, ["SelectedSection", "BrokenSection", "IsEOL"]);
                const sectionIds = SelectedSection;
                if (graphUser.user.CompanyCode != data.CompanyCode &&
                    ![UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN, UserTypeEnum_enum_1.UserTypeEnum.SUPERADMIN].includes(graphUser.user.Type)) {
                    throw new common_1.ForbiddenException("Not your Company!");
                }
                const category = await manager.findOne(category_entity_1.Category, {
                    relations: { Sections: true },
                    where: { CategoryID: data.CategoryID },
                });
                if (BrokenSection.length > 0) {
                    await manager
                        .createQueryBuilder()
                        .relation(section_entity_1.Section, "Category")
                        .of(BrokenSection)
                        .set(null);
                }
                const sectionListWithMatch = await this.sectionRepo.findWithWhereConditions({ CategoryID: data.CategoryID }, database_type_enum_1.DataBaseTypeEnum.USE);
                const matchSectionIds = sectionListWithMatch.map((section) => section.SectionID);
                if (sectionIds.length === 0) {
                    {
                        for (const id of matchSectionIds) {
                            const section = sectionListWithMatch.find((section) => section.SectionID === id);
                            await manager.update(section_entity_1.Section, { SectionID: id }, {
                                CategoryID: null,
                                Use: (0, validators_1.getInUseStatusWithDeletedOrBroken)(section.Use),
                                Live: (0, validators_1.getInLiveStatus)(section.Live),
                            });
                        }
                    }
                }
                else {
                    const sectionList = await this.sectionRepo.findWithWhereConditions({ SectionID: (0, typeorm_2.In)(sectionIds) }, database_type_enum_1.DataBaseTypeEnum.USE, { Category: true });
                    for (const section of sectionList) {
                        const sectionListWithCategoryId = await this.sectionRepo.findWithWhereConditions({ CategoryID: section.CategoryID }, database_type_enum_1.DataBaseTypeEnum.USE);
                        if (section.Category) {
                            await this.categoryRepo.insertOrUpsert(Object.assign(Object.assign({}, section.Category), { Use: sectionListWithCategoryId.filter((category) => sectionIds.includes(category.SectionID)).length === sectionListWithCategoryId.length
                                    ? (0, validators_1.getInUseStatusWithDeletedOrBroken)(section.Category.Use)
                                    : (0, validators_1.getInUseStatus)(section.Category.Live, section.Category.Use), Live: (0, validators_1.getInLiveStatus)(section.Category.Live) }), database_type_enum_1.DataBaseTypeEnum.USE);
                        }
                        await manager.update(section_entity_1.Section, { SectionID: section.SectionID }, {
                            CategoryID: data.CategoryID,
                            Use: (0, validators_1.getInUseStatus)(section.Live, section.Use),
                            Live: (0, validators_1.getInLiveStatus)(section.Live),
                        });
                    }
                    if (sectionListWithMatch.length > 0) {
                        const a = sectionListWithMatch;
                        const b = await this.sectionRepo.findWithWhereConditions({ SectionID: (0, typeorm_2.In)(sectionIds) }, database_type_enum_1.DataBaseTypeEnum.USE);
                        let diffA = a.filter((a) => !b.includes(a));
                        for (const a of diffA) {
                            await manager.update(section_entity_1.Section, { SectionID: a.SectionID }, {
                                CategoryID: null,
                                Use: (0, validators_1.getInUseStatusWithDeletedOrBroken)(a.Use),
                                Live: (0, validators_1.getInLiveStatus)(a.Live),
                            });
                        }
                        let diffB = b.filter((b) => !a.includes(b));
                        for (const b of diffB) {
                            await manager.update(section_entity_1.Section, { SectionID: b.SectionID }, {
                                CategoryID: data.CategoryID,
                                Use: (0, validators_1.getInUseStatus)(b.Live, b.Use),
                                Live: (0, validators_1.getInLiveStatus)(b.Live),
                            });
                        }
                    }
                }
                if (category.SameName == false &&
                    data.SameName == true &&
                    [UserTypeEnum_enum_1.UserTypeEnum.GLOBALADMIN, UserTypeEnum_enum_1.UserTypeEnum.SUPERADMIN].includes(graphUser.user.Type)) {
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
                        const duplicateCategory = await this.categoryRepo.findOneWithWhereConditions(whereConditions, database_type_enum_1.DataBaseTypeEnum.USE);
                        if (duplicateCategory)
                            continue;
                        const { CategoryID } = data, newCategoryData = __rest(data, ["CategoryID"]);
                        await this.categoryRepo.insertOrUpsert({
                            Name: newCategoryData.Name,
                            SameName: true,
                            AlwaysDisplay: false,
                            Use: DataStateEnum_2.Use.Broken,
                            Live: DataStateEnum_1.Live.New,
                            CompanyCode: !c.CompanyCode ? null : c.CompanyCode,
                        }, database_type_enum_1.DataBaseTypeEnum.USE);
                    }
                }
                return await manager.update(category_entity_1.Category, {
                    CategoryID: data.CategoryID,
                }, Object.assign(Object.assign({}, data), { Use: (0, before_update_status_inuse_1.beforeUpdateStatusInUse)(sectionIds.length > 0, category.Live, IsEOL), Live: (0, before_update_status_inlive_1.beforeUpdateStatusInLive)(sectionIds.length > 0, category.Live) }));
            }));
        });
    }
    async remove(graphUser, ids) {
        return await this.dataSource.transaction(async (manager) => {
            await manager.delete(category_entity_1.Category, Object.assign({ CategoryID: (0, typeorm_2.In)(ids), Use: (0, typeorm_2.In)([DataStateEnum_2.Use.New, DataStateEnum_2.Use.Broken]), Live: DataStateEnum_1.Live.New }, (0, company_helper_1.companyWhereFilter)(graphUser.user)));
            for (const id of ids) {
                const sectionList = await this.sectionRepo.findWithWhereConditions({ CategoryID: id }, database_type_enum_1.DataBaseTypeEnum.USE);
                for (const section of sectionList) {
                    await manager.update(section_entity_1.Section, Object.assign({ SectionID: section.SectionID }, (0, company_helper_1.companyWhereFilter)(graphUser.user)), {
                        CategoryID: null,
                        Use: (0, validators_1.getInUseStatusWithDeletedOrBroken)(section === null || section === void 0 ? void 0 : section.Use),
                        Live: (0, validators_1.getInLiveStatus)(section === null || section === void 0 ? void 0 : section.Live),
                    });
                }
            }
            return await manager.update(category_entity_1.Category, Object.assign({ CategoryID: (0, typeorm_2.In)(ids), Live: (0, typeorm_2.In)([DataStateEnum_1.Live.Live, DataStateEnum_1.Live.Pending]) }, (0, company_helper_1.companyWhereFilter)(graphUser.user)), {
                Use: DataStateEnum_2.Use.Deleted,
                Live: DataStateEnum_1.Live.Pending,
            });
        });
    }
    async download(graphUser, companyQuery, res) {
        const data = await this.useCategoriesRepository.find({
            where: (0, company_helper_1.companyWhereFilter)(graphUser.user, companyQuery.company || (0, typeorm_2.IsNull)()),
        });
        const company = await this.useCompanyRepository.findOneBy((0, company_helper_1.companyWhereFilter)(graphUser.user, companyQuery.company || (0, typeorm_2.IsNull)()));
        const workbook = new exceljs_1.Workbook();
        await workbook.xlsx.readFile((0, path_1.resolve)("templates", "exports", "20231109_Download_Category_V0.1.xlsx"));
        const worksheet = workbook.getWorksheet(1);
        const timeCell = worksheet.getCell("F1");
        timeCell.value = new Date();
        const libCell = worksheet.getCell("C1");
        libCell.value = company ? company.Abbreviation : "GLOBAL";
        const startRow = 5;
        data.forEach((r, i) => {
            worksheet.insertRow(startRow + i, [
                i + 1,
                r.Name,
                r.AlwaysDisplay ? "Y" : "N",
                r.SameName ? "Y" : "N",
                r.Use,
                r.Live,
                r.UpdatedDate,
            ]);
            worksheet.getRow(startRow + i).getCell(7).numFmt = "dd/mmm/yyyy hh:mm:ss";
        });
        return workbook.xlsx.write(res);
    }
    async dropdown(graphUser, query) {
        let companyCode = (0, company_helper_1.companyWhereFilter)(graphUser.user, query.company || (0, typeorm_2.IsNull)());
        const whereConditions = Object.assign(Object.assign({}, companyCode), { Use: (0, typeorm_2.Not)(DataStateEnum_2.Use.Deleted) });
        const relations = {
            Sections: true,
        };
        return await this.categoryRepo.findWithWhereConditions(whereConditions, database_type_enum_1.DataBaseTypeEnum.USE, relations);
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category, db_2.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category, db_1.LIVE_DB_NAME)),
    __param(2, (0, typeorm_1.InjectRepository)(company_entity_1.Company, db_2.USE_DB_NAME)),
    __param(3, (0, typeorm_1.InjectRepository)(section_entity_1.Section, db_2.USE_DB_NAME)),
    __param(4, (0, typeorm_1.InjectRepository)(section_entity_1.Section, db_2.USE_DB_NAME)),
    __param(5, (0, typeorm_1.InjectDataSource)(db_2.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        categories_repository_1.CategoriesRepository,
        sections_repository_1.SectionsRepository])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map