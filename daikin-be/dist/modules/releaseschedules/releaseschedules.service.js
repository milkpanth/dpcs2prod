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
var ReleaseScheduleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReleaseScheduleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cron_1 = require("cron");
const moment = __importStar(require("moment"));
const db_1 = require("../../shared/constants/db");
const releaseschedule_entity_1 = require("./entities/releaseschedule.entity");
const schedule_1 = require("@nestjs/schedule");
const DataStateEnum_1 = require("../../shared/enum/DataStateEnum");
const datamanagements_service_1 = require("../datamanagements/datamanagements.service");
let ReleaseScheduleService = ReleaseScheduleService_1 = class ReleaseScheduleService {
    constructor(releaseSchedulesRepository, connection, connectionLive, schedulerRegistry, dataManagementsService) {
        this.releaseSchedulesRepository = releaseSchedulesRepository;
        this.connection = connection;
        this.connectionLive = connectionLive;
        this.schedulerRegistry = schedulerRegistry;
        this.dataManagementsService = dataManagementsService;
        this.logger = new common_1.Logger(ReleaseScheduleService_1.name);
    }
    async create(user, createReleaseScheduleDto, queryPayload) {
        const newSchedule = this.releaseSchedulesRepository.create(Object.assign(Object.assign({}, createReleaseScheduleDto), { Status: "PENDING" }));
        const savedSchedule = await this.releaseSchedulesRepository.save(newSchedule);
        this.addCronJob(savedSchedule, user, queryPayload);
        return savedSchedule;
    }
    list() {
        return this.releaseSchedulesRepository.find();
    }
    async remove(ID) {
        const schedule = await this.releaseSchedulesRepository.findOne({
            where: { ID },
        });
        if (schedule) {
            this.scheduleTaskAtSpecificDateCancel(ID);
            this.removeCronJob(schedule);
        }
        return this.releaseSchedulesRepository.delete({ ID });
    }
    addCronJob(schedule, user, queryPayload) {
        const jobName = `release-${schedule.ID}`;
        console.log(jobName);
        try {
            const existingJob = this.schedulerRegistry.getCronJob(jobName);
            if (existingJob) {
                this.logger.warn(`Cron job ${jobName} already exists`);
                return;
            }
        }
        catch (e) {
            this.logger.log(`${e.error} Cron job ${jobName}`);
        }
        const runAtDate = new Date(schedule.RunAt);
        if (runAtDate <= new Date()) {
            this.logger.error(`Scheduled time ${runAtDate} is in the past`);
            throw new Error("Scheduled time is in the past");
        }
        const job = new cron_1.CronJob(runAtDate, async () => {
            this.logger.log(`Running job ${jobName} scheduled to run at ${this.formatDate(schedule.RunAt)}`);
            try {
                await this.scheduleTaskAtSpecificDate();
                await this.dataManagementsService.doScheduleRelease(user, queryPayload);
            }
            catch (error) {
                this.logger.error(`Error running job ${jobName}`, error.stack);
            }
        });
        this.schedulerRegistry.addCronJob(jobName, job);
        job.start();
        this.logger.log(`Scheduled job ${jobName} to run at ${this.formatDate(schedule.RunAt)}`);
    }
    removeCronJob(schedule) {
        const jobName = `release-${schedule.ID}`;
        try {
            const job = this.schedulerRegistry.getCronJob(jobName);
            if (job) {
                job.stop();
                this.schedulerRegistry.deleteCronJob(jobName);
                this.logger.log(`Deleted job ${jobName}`);
            }
        }
        catch (e) {
            this.logger.warn(`Job ${jobName} not found`);
        }
    }
    async scheduleTaskAtSpecificDate() {
        const currentDate = new Date();
        const schedules = await this.list();
        for (const schedule of schedules) {
            if (schedule.Status === "PENDING") {
            }
            if (this.formatDate(schedule.RunAt) === this.formatDate(currentDate)) {
                try {
                    if (schedule.Status === "PENDING") {
                        const tags = schedule.Data.filter((f) => f.type === "tags").map((e) => `"${e.name}"`);
                        if (tags.length === 0) {
                            console.log("No Tags to update");
                        }
                        else {
                            const resultTags = await this.connection.query("select `Name`,`Use`,`Live` from tags where Name  IN(" +
                                tags +
                                ");");
                            console.log(resultTags);
                            resultTags.forEach((element) => {
                                this.logger.log(element);
                                if (element.Use === "Deleted") {
                                    this.connection.query('DELETE FROM tags WHERE `Use` = "Deleted" and  name IN(' +
                                        schedule.Data.filter((f) => f.type === "tags").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`) +
                                        ");");
                                }
                                else {
                                    this.connection.query(`update tags SET \`use\` = 'Using', Live = 'Live' Where   name IN(${schedule.Data.filter((f) => f.type === "tags").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                    this.connectionLive.query(`update tags SET \`use\` = 'Using',  Live = 'Live' Where   name IN(${schedule.Data.filter((f) => f.type === "tags").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                }
                            });
                        }
                        const category = schedule.Data.filter((f) => f.type === "category").map((e) => `"${e.name}"`);
                        if (category.length === 0) {
                            console.log("No Categry to update");
                        }
                        else {
                            const resultCategory = await this.connection.query("select `Name`,`Use`,`Live` from categories where Name  IN(" +
                                category +
                                ");");
                            console.log(resultCategory);
                            resultCategory.forEach((element) => {
                                this.logger.log(element);
                                if (element.Use === DataStateEnum_1.Use.Deleted &&
                                    element.Live === DataStateEnum_1.Live.Queued) {
                                    this.connection.query('DELETE FROM categories WHERE `Use` = "Deleted" and  name IN(' +
                                        schedule.Data.filter((f) => f.type === "category").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`) +
                                        ");");
                                }
                                else {
                                    this.connection.query(`update categories SET \`use\` = 'Using', live = 'Live' Where Live = '${DataStateEnum_1.Live.Queued}' and name IN(${schedule.Data.filter((f) => f.type === "category").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                    this.connectionLive.query(`update categories SET \`use\` = 'Using', live = 'Live' Where Live = '${DataStateEnum_1.Live.Queued}' and name IN(${schedule.Data.filter((f) => f.type === "category").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                }
                            });
                        }
                        const section = schedule.Data.filter((f) => f.type === "section").map((e) => `"${e.name}"`);
                        if (section.length === 0) {
                            console.log("No Section to update");
                        }
                        else {
                            const result = await this.connection.query("select `Name`,`Use`,`Live` from sections where Name  IN(" +
                                section +
                                ");");
                            console.log(result);
                            result.forEach((element) => {
                                if (element.Use === "Deleted") {
                                    this.connection.query('DELETE FROM sections WHERE `Use` = "Deleted" and  name IN(' +
                                        schedule.Data.filter((f) => f.type === "section").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`) +
                                        ");");
                                }
                                else {
                                    this.connection.query(`update sections SET \`use\` = 'Using', Live = 'Live' Where  name IN(${schedule.Data.filter((f) => f.type === "section").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                    this.connectionLive.query(`update sections SET \`use\` = 'Using', Live = 'Live' Where name IN(${schedule.Data.filter((f) => f.type === "section").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                }
                            });
                        }
                        const slide = schedule.Data.filter((f) => f.type === "slide").map((e) => `"${e.name}"`);
                        if (slide.length === 0) {
                            console.log("No slide to update");
                        }
                        else {
                            const result = await this.connection.query("select `SlideID`,`Use`,`Live` from slides where SlideID  IN(" +
                                slide +
                                ");");
                            console.log(result);
                            const resultSlideFile = await this.connection.query("select `SlideID`,`Language`,`Path`,`slideTotalPage`,`version`,`CreatedDate`,`CreatedBy` from slidefiles where SlideID  IN(" +
                                slide +
                                ");");
                            console.log(resultSlideFile);
                            const resultSlideTag = await this.connection.query("select `SlideID`,`TagID` from slidetags where SlideID IN(" +
                                slide +
                                ");");
                            console.log(resultSlideTag);
                            result.forEach((element) => {
                                if (element.Use === "Deleted") {
                                    this.connection.query('DELETE FROM slides WHERE `Use` = "Deleted" and SlideID IN(' +
                                        schedule.Data.filter((f) => f.type === "slide").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`) +
                                        ");");
                                }
                                else {
                                    this.connection.query(`update slides SET \`use\` = 'Using', Live = 'Live' Where  SlideID IN(${schedule.Data.filter((f) => f.type === "slide").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                    this.connectionLive.query(`update slides SET \`use\` = 'Using', Live = 'Live' Where SlideID IN(${schedule.Data.filter((f) => f.type === "slide").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                }
                            });
                            resultSlideFile.forEach((element) => {
                                this.connectionLive.query(`INSERT INTO slidefiles (SlideID, Language, Path, SlideTotalPage,Version)
                  VALUES ('${element.SlideID}', '${element.Language}', '${element.Path}', '${element.slideTotalPage}', '${element.version}')`);
                            });
                            resultSlideTag.forEach((element) => {
                                this.connectionLive.query(`INSERT INTO slidetags (SlideID, TagID)
                  VALUES ('${element.SlideID}', '${element.TagID}')`);
                            });
                        }
                        const image = schedule.Data.filter((f) => f.type === "image").map((e) => `"${e.name}"`);
                        if (image.length === 0) {
                            console.log("No Image to update");
                        }
                        else {
                            const result = await this.connection.query("select `Name`,`Use`,`Live` from images where Name  IN(" +
                                image +
                                ");");
                            console.log(result);
                            result.forEach((element) => {
                                if (element.Use === "Deleted") {
                                    this.connection.query('DELETE FROM images WHERE `Use` = "Deleted" and  name IN(' +
                                        schedule.Data.filter((f) => f.type === "image").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`) +
                                        ");");
                                }
                                else {
                                    this.connection.query(`update images SET \`use\` = 'Using', Live = 'Live' Where  name IN(${schedule.Data.filter((f) => f.type === "image").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                    this.connectionLive.query(`update images SET \`use\` = 'Using', Live = 'Live' Where name IN(${schedule.Data.filter((f) => f.type === "image").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                }
                            });
                        }
                        const serie = schedule.Data.filter((f) => f.type === "series").map((e) => `"${e.name}"`);
                        if (serie.length === 0) {
                            console.log("No Series to update");
                        }
                        else {
                            const result = await this.connection.query("select `Name`,`Use`,`Live` from series where Name  IN(" +
                                serie +
                                ");");
                            console.log(result);
                            result.forEach((element) => {
                                if (element.Use === "Deleted") {
                                    this.connection.query('DELETE FROM series WHERE `Use` = "Deleted" and  name IN(' +
                                        schedule.Data.filter((f) => f.type === "serie").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`) +
                                        ");");
                                }
                                else {
                                    this.connection.query(`update series SET \`use\` = 'Using', Live = 'Live' Where  name IN(${schedule.Data.filter((f) => f.type === "series").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                    this.connectionLive.query(`update series SET \`use\` = 'Using', Live = 'Live' Where name IN(${schedule.Data.filter((f) => f.type === "series").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                }
                            });
                        }
                        const model = schedule.Data.filter((f) => f.type === "model").map((e) => `"${e.name}"`);
                        if (model.length === 0) {
                            console.log("No Models to update");
                        }
                        else {
                            const result = await this.connection.query("select `Name`,`Use`,`Live` from models where Name  IN(" +
                                model +
                                ");");
                            console.log(result);
                            result.forEach((element) => {
                                if (element.Use === "Deleted") {
                                    this.connection.query('DELETE FROM models WHERE `Use` = "Deleted" and  name IN(' +
                                        schedule.Data.filter((f) => f.type === "model").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`) +
                                        ");");
                                }
                                else {
                                    this.connection.query(`update models SET \`use\` = 'Using', Live = 'Live' Where  name IN(${schedule.Data.filter((f) => f.type === "model").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                    this.connectionLive.query(`update models SET \`use\` = 'Using', Live = 'Live' Where name IN(${schedule.Data.filter((f) => f.type === "model").map((e) => `'${e.name.split("','").map((item) => item.trim())}'`)});`);
                                }
                            });
                        }
                        await this.connection.query(`update release_schedules SET Status ='SUCCESS' WHERE RunAt = '${this.formatDateAT(schedule.RunAt)}';`);
                    }
                }
                catch (error) {
                    this.logger.error("Error fetching users", error.stack);
                }
            }
        }
    }
    async scheduleTaskAtSpecificDateCancel(ID) {
        console.log(ID);
        try {
            const resultRelease = await this.connection.query(`SELECT \`ID\`, \`Data\`, \`RunAt\`, \`Status\` FROM release_schedules WHERE \`ID\` = ?;`, [ID]);
            if (resultRelease.length === 0) {
                console.log(`No schedule found with ID: ${ID}`);
                return;
            }
            console.log(resultRelease);
            for (const element of resultRelease) {
                const data = JSON.parse(element.Data);
                for (const item of data) {
                    console.log(item.name);
                    if (item.type === "tags") {
                        const resultTags = await this.connection.query(`SELECT \`TagID\`, \`Name\`, \`Use\`, \`Live\` FROM tags WHERE Name = ?;`, [item.name]);
                        if (resultTags.length === 0) {
                            console.log(`No tags found with name: ${item.name}`);
                            continue;
                        }
                        for (const tag of resultTags) {
                            await this.connection.query(`UPDATE tags SET \`Use\` = ?, Live = ? WHERE Name = ?;`, [
                                tag.Use === "Using" ? "Using" : "New",
                                tag.Use === "Using" ? "Pending" : "New",
                                item.name,
                            ]);
                        }
                    }
                    if (item.type === "category") {
                        const resultCategory = await this.connection.query(`SELECT \`CategoryID\`, \`Name\`, \`Use\`, \`Live\` FROM categories WHERE Name = ?;`, [item.name]);
                        if (resultCategory.length === 0) {
                            console.log(`No tags found with name: ${item.name}`);
                            continue;
                        }
                        for (const category of resultCategory) {
                            await this.connection.query(`UPDATE categories SET \`Use\` = ?, Live = ? WHERE CategoryID = ?;`, [
                                category.Use === "Using" ? "Using" : "New",
                                category.Use === "Using" ? "Pending" : "New",
                                category.CategoryID,
                            ]);
                        }
                    }
                    if (item.type === "section") {
                        const resultSection = await this.connection.query(`SELECT \`SectionID\`, \`Name\`, \`Use\`, \`Live\` FROM sections WHERE Name = ?;`, [item.name]);
                        if (resultSection.length === 0) {
                            console.log(`No tags found with name: ${item.name}`);
                            continue;
                        }
                        for (const section of resultSection) {
                            await this.connection.query(`UPDATE sections SET \`Use\` = ?, Live = ? WHERE SectionID = ?;`, [
                                section.Use === "Using" ? "Using" : "New",
                                section.Use === "Using" ? "Pending" : "New",
                                section.SectionID,
                            ]);
                        }
                    }
                    if (item.type === "series") {
                        const resultseries = await this.connection.query(`SELECT \`Name\`, \`Use\`, \`Live\` FROM series WHERE Name = ?;`, [item.name]);
                        if (resultseries.length === 0) {
                            console.log(`No tags found with name: ${item.name}`);
                            continue;
                        }
                        for (const serie of resultseries) {
                            await this.connection.query(`UPDATE series SET \`Use\` = ?, Live = ? WHERE Name = ?;`, [
                                serie.Use === "Using" ? "Using" : "New",
                                serie.Use === "Using" ? "Pending" : "New",
                                serie.Name,
                            ]);
                        }
                    }
                    if (item.type === "model") {
                        const resultModel = await this.connection.query(`SELECT \`Name\`, \`Use\`, \`Live\` FROM models WHERE Name = ?;`, [item.name]);
                        if (resultModel.length === 0) {
                            console.log(`No tags found with name: ${item.name}`);
                            continue;
                        }
                        for (const model of resultModel) {
                            await this.connection.query(`UPDATE models SET \`Use\` = ?, Live = ? WHERE Name = ?;`, [
                                model.Use === "Using" ? "Using" : "New",
                                model.Use === "Using" ? "Pending" : "New",
                                model.Name,
                            ]);
                        }
                    }
                    if (item.type === "slide") {
                        const resulSlide = await this.connection.query(`SELECT \`SlideID\`, \`Use\`, \`Live\` FROM slides WHERE SlideID = ?;`, [item.name]);
                        if (resulSlide.length === 0) {
                            console.log(`No tags found with name: ${item.SlideID}`);
                            continue;
                        }
                        for (const slide of resulSlide) {
                            await this.connection.query(`UPDATE slides SET \`Use\` = ?, Live = ? WHERE SlideID = ?;`, [
                                slide.Use === "Using" ? "Using" : "New",
                                slide.Use === "Using" ? "Pending" : "New",
                                slide.SlideID,
                            ]);
                        }
                    }
                    if (item.type === "image") {
                        const resulSlide = await this.connection.query(`SELECT \`ImageID\`,\`Name\`, \`Use\`, \`Live\` FROM images WHERE Name = ?;`, [item.name]);
                        if (resulSlide.length === 0) {
                            console.log(`No tags found with name: ${item.Name}`);
                            continue;
                        }
                        for (const slide of resulSlide) {
                            await this.connection.query(`UPDATE images SET \`Use\` = ?, Live = ? WHERE ImageID = ?;`, [
                                slide.Use === "Using" ? "Using" : "New",
                                slide.Use === "Using" ? "Pending" : "New",
                                slide.SectionID,
                            ]);
                        }
                    }
                }
            }
        }
        catch (error) {
            console.error("Error fetching release schedules:", error.stack);
        }
    }
    formatDate(date) {
        return moment.default(date).format("DD/MM/YYYY HH:mm:ss");
    }
    formatDateAT(date) {
        return moment.default(date).format("YYYY-MM-DD HH:mm:ss");
    }
};
ReleaseScheduleService = ReleaseScheduleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(releaseschedule_entity_1.ReleaseSchedule, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectConnection)(db_1.USE_DB_NAME)),
    __param(2, (0, typeorm_1.InjectConnection)(db_1.LIVE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, Object, schedule_1.SchedulerRegistry,
        datamanagements_service_1.DataManagementsService])
], ReleaseScheduleService);
exports.ReleaseScheduleService = ReleaseScheduleService;
//# sourceMappingURL=releaseschedules.service.js.map