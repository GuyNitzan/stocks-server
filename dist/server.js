"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SECOND = 1000;
const model_1 = require("./model");
const routing_controllers_1 = require("routing-controllers");
const sequelize_1 = require("./sequelize");
const stock_controller_1 = require("./API/stock.controller");
const app = routing_controllers_1.createExpressServer({
    cors: true,
    controllers: [stock_controller_1.StockController],
});
const server = require('http').createServer(app);
var io = require('socket.io')(server);
const port = 3000;
//initialize stocks, balance and price update intervals
sequelize_1.sequelize.sync({ force: true }).then(() => {
    generateStocks();
    generateBalance();
    setInterval(updatePrices, 10 * SECOND);
});
server.listen(port, () => {
    console.log('server on');
    io.on('connection', function (client) {
        console.log('client connected');
        client.on('disconnect', function () {
            console.log('client disconnected');
        });
    });
});
const generateStocks = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let stocks = yield model_1.Stock.find();
        if (!stocks) {
            const s1 = new model_1.Stock({ name: 's1', value: 100, lastValue: 33, openValue: 10 });
            const s2 = new model_1.Stock({ name: 's2', value: 200, lastValue: 122, openValue: 20 });
            const s3 = new model_1.Stock({ name: 's3', value: 300, lastValue: 911, openValue: 30 });
            const s4 = new model_1.Stock({ name: 's4', value: 400, lastValue: 374, openValue: 40 });
            const s5 = new model_1.Stock({ name: 's5', value: 500, lastValue: 639, openValue: 50 });
            yield s1.save();
            yield s2.save();
            yield s3.save();
            yield s4.save();
            yield s5.save();
        }
    });
};
const generateBalance = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let newBalane = new model_1.UserBalance({ id: 1, value: 1000 });
        yield newBalane.save();
    });
};
const updatePrices = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let stocks = yield model_1.Stock.findAll();
        let userStocks = yield model_1.UserStock.findAll();
        stocks.forEach((element) => __awaiter(this, void 0, void 0, function* () {
            let newValue = Math.floor(1 + (Math.random() * 100));
            let lastValue = element.value;
            yield model_1.Stock.update({ value: newValue, lastValue: lastValue }, { where: { name: element.name } });
        }));
        //check correct values
        userStocks.forEach((element) => __awaiter(this, void 0, void 0, function* () {
            let stock = yield model_1.Stock.findById(element.name);
            yield model_1.UserStock.update({ value: stock.value }, { where: { name: element.name } });
        }));
        const updatedStocks = yield model_1.Stock.findAll({ order: [['name', 'ASC']] });
        io.emit('stocks-prices-update', updatedStocks);
    });
};
//# sourceMappingURL=server.js.map