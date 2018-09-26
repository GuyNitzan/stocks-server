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
const sequelize_typescript_1 = require("sequelize-typescript");
let Transaction = class Transaction extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Transaction.prototype, "stockName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transaction.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Transaction.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Transaction.prototype, "date", void 0);
Transaction = __decorate([
    sequelize_typescript_1.Table
], Transaction);
exports.Transaction = Transaction;
exports.default = Transaction;
// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     first_name: DataTypes.STRING,
//     last_name: DataTypes.STRING,
//     email: DataTypes.STRING
//   });
//   User.associate = function(models) {
//     models.User.hasMany(models.Post);
//   };
//   return User;
// };
//# sourceMappingURL=Transaction.model.js.map