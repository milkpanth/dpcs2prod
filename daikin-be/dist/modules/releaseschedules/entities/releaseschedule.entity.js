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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReleaseSchedule = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_1 = require("../../../shared/entities/base");
let ReleaseSchedule = class ReleaseSchedule extends base_1.BaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "primary key",
        type: "number",
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReleaseSchedule.prototype, "ID", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "date",
        type: "any",
        example: [],
    }),
    (0, typeorm_1.Column)({
        type: "text",
        transformer: {
            to(value) {
                return JSON.stringify(value);
            },
            from(value) {
                return JSON.parse(value);
            },
        },
    }),
    __metadata("design:type", Array)
], ReleaseSchedule.prototype, "Data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "run date",
        type: "date",
        example: new Date(),
    }),
    (0, typeorm_1.Column)({ type: "datetime", nullable: false }),
    __metadata("design:type", Date)
], ReleaseSchedule.prototype, "RunAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "status",
        type: "string",
        example: "test",
    }),
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], ReleaseSchedule.prototype, "Status", void 0);
ReleaseSchedule = __decorate([
    (0, typeorm_1.Entity)("release_schedules")
], ReleaseSchedule);
exports.ReleaseSchedule = ReleaseSchedule;
//# sourceMappingURL=releaseschedule.entity.js.map