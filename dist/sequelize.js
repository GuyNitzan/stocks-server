"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("../node_modules/sequelize-typescript");
const model_1 = require("./model");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: 'stocksDB',
    dialect: 'postgres',
    username: 'guynitz',
    password: '3465',
    host: 'localhost',
    port: 5432,
    logging: false,
    operatorsAliases: false
});
exports.sequelize.addModels([model_1.Stock, model_1.Transaction, model_1.UserStock, model_1.UserBalance]);
//# sourceMappingURL=sequelize.js.map