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
exports.SlideTag = void 0;
const typeorm_1 = require("typeorm");
let SlideTag = class SlideTag {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], SlideTag.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "SlideID" }),
    __metadata("design:type", Number)
], SlideTag.prototype, "SlideID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "TagID" }),
    __metadata("design:type", Number)
], SlideTag.prototype, "TagID", void 0);
SlideTag = __decorate([
    (0, typeorm_1.Entity)("slidetags")
], SlideTag);
exports.SlideTag = SlideTag;
//# sourceMappingURL=slidetag.entity.js.map