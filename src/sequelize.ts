import {Sequelize} from '../node_modules/sequelize-typescript'
import { UserBalance, UserStock, Transaction, Stock} from './model';

export const sequelize = new Sequelize({
    database: 'stocksDB',
    dialect: 'postgres',
    username: 'guynitz',
    password: '3465',
    host: 'localhost',
    port: 5432,
    logging: false,
    operatorsAliases: false
});
sequelize.addModels([Stock, Transaction, UserStock, UserBalance]);
