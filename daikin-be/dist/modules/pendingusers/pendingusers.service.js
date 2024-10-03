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
exports.PendingUsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const db_1 = require("../../shared/constants/db");
const graph_service_1 = require("../../shared/msgraph/graph.service");
const entity_helper_1 = require("../../utils/entity-helper");
const pagination_1 = require("../../utils/pagination");
const company_entity_1 = require("../companies/entities/company.entity");
const user_entity_1 = require("../users/entities/user.entity");
const pendinguser_entity_1 = require("./entities/pendinguser.entity");
let PendingUsersService = class PendingUsersService {
    constructor(pendingUsersRepository, usersRepository, companiesRepository, graphService) {
        this.pendingUsersRepository = pendingUsersRepository;
        this.usersRepository = usersRepository;
        this.companiesRepository = companiesRepository;
        this.graphService = graphService;
    }
    async create(graphUser, createPendingUserDto) {
        const user = await this.usersRepository.findOneBy({
            UserMemberEmail: createPendingUserDto.UserMemberEmail,
        });
        if (user) {
            throw new common_1.BadRequestException("User email already exist!");
        }
        return this.pendingUsersRepository.save(this.pendingUsersRepository.create(Object.assign(Object.assign({}, createPendingUserDto), { ApproveStatus: null, CreatedBy: graphUser.user.UserMemberID })));
    }
    async findAll(query) {
        return (0, nestjs_typeorm_paginate_1.paginate)(this.pendingUsersRepository, (0, pagination_1.getBasePaginationOption)(query), query.keyword
            ? {
                where: [
                    { UserMemberEmail: (0, typeorm_2.Like)(`%${(0, entity_helper_1.escapeLikeString)(query.keyword)}%`) },
                    { UserMemberName: (0, typeorm_2.Like)(`%${(0, entity_helper_1.escapeLikeString)(query.keyword)}%`) },
                    {
                        UserMemberSurname: (0, typeorm_2.Like)(`%${(0, entity_helper_1.escapeLikeString)(query.keyword)}%`),
                    },
                ],
            }
            : null);
    }
    async update(graphUser, pendingId, updatePendingUserDto) {
        const pendingUser = await this.pendingUsersRepository.findOneBy({
            ID: pendingId,
        });
        if (!pendingUser) {
            throw new common_1.NotFoundException("User not found!");
        }
        if (pendingUser.ApproveStatus != null) {
            throw new common_1.BadRequestException("User decision has been decided!");
        }
        if (updatePendingUserDto.ApproveStatus) {
            const responseData = await this.graphService.inviteUser(pendingUser.UserMemberEmail);
            const { invitedUser } = responseData;
            await this.usersRepository.save(this.usersRepository.create(Object.assign(Object.assign({}, pendingUser), { UserMemberID: invitedUser.id, UserMemberStatus: true, UpdatedBy: graphUser.user.UserMemberID })));
            const { CompanyCode, Name, Abbreviation } = await this.companiesRepository.findOneByOrFail({
                CompanyCode: pendingUser.CompanyCode,
            });
            await this.graphService.setUserProperty(invitedUser.id, {
                companyName: Name,
                extension_25df96e0112c41428645a90445fd9e69_CompanyCode: CompanyCode,
                extension_25df96e0112c41428645a90445fd9e69_CompanyAbbr: Abbreviation,
            });
        }
        return this.pendingUsersRepository.update({
            ID: pendingId,
        }, Object.assign({}, updatePendingUserDto));
    }
};
PendingUsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pendinguser_entity_1.PendingUser, db_1.USE_DB_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User, db_1.USE_DB_NAME)),
    __param(2, (0, typeorm_1.InjectRepository)(company_entity_1.Company, db_1.USE_DB_NAME)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        graph_service_1.GraphService])
], PendingUsersService);
exports.PendingUsersService = PendingUsersService;
//# sourceMappingURL=pendingusers.service.js.map