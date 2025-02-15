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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotExist = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
let IsNotExist = class IsNotExist {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async validate(value, validationArguments) {
        const repository = validationArguments.constraints[0];
        const currentValue = validationArguments.object;
        const entity = (await this.dataSource.getRepository(repository).findOne({
            where: {
                [validationArguments.property]: value,
            },
        }));
        if ((entity === null || entity === void 0 ? void 0 : entity.id) === (currentValue === null || currentValue === void 0 ? void 0 : currentValue.id)) {
            return true;
        }
        return !entity;
    }
};
IsNotExist = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsNotExist', async: true }),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], IsNotExist);
exports.IsNotExist = IsNotExist;
//# sourceMappingURL=is-not-exists.validator.js.map