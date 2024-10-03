"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("./create-user.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdateUserDto extends (0, mapped_types_1.PartialType)((0, swagger_1.OmitType)(create_user_dto_1.CreateUserDto, ["UserMemberID"])) {
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map