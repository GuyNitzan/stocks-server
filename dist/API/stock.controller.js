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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const model_1 = require("../model");
let StockController = class StockController {
    //return all stocks that are in the market
    getAllStocks() {
        return __awaiter(this, void 0, void 0, function* () {
            const stocks = yield model_1.Stock.findAll({
                order: [
                    ['name', 'ASC']
                ]
            });
            return stocks.map(s => s.toJSON());
        });
    }
    //return all user stocks that are currently in account
    getUserStocks() {
        return __awaiter(this, void 0, void 0, function* () {
            const stocks = yield model_1.UserStock.findAll();
            return stocks.map(s => s.toJSON());
        });
    }
    //return a specific stock
    getStock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestedStock = yield model_1.Stock.findById(id);
            return requestedStock.toJSON();
        });
    }
    // return a transaction history log
    getHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            const history = yield model_1.Transaction.findAll();
            return history.map(s => s.toJSON());
        });
    }
    //return the balance of the user
    getBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield model_1.UserBalance.findById(1);
            return balance.toJSON();
        });
    }
    //update the balance with a given delta (could be negative/positive)
    updateBalance(change) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentBalance = yield model_1.UserBalance.findById(1);
            currentBalance.value += change.change;
            return yield currentBalance.save().toJSON();
        });
    }
    //update the amount of a user-stock in the account 
    //+ buying price average for this stock
    updateUserStock(stockName, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let stock = yield model_1.Stock.findByPrimary(stockName);
            let usrStock = yield model_1.UserStock.findByPrimary(stockName);
            if (usrStock) {
                if (body.amount >= 0) {
                    usrStock.averagePurchasePrice = this.calcNewAverage(usrStock.averagePurchasePrice, usrStock.amount, body.amount, body.price);
                }
                usrStock.amount += body.amount;
            }
            else {
                console.log('creating new user stock');
                usrStock = new model_1.UserStock({ name: stockName, amount: body.amount,
                    value: stock.value, averagePurchasePrice: body.price });
            }
            return yield usrStock.save().toJSON();
        });
    }
    //add a new transaction to history
    addToHistory(t) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestedStock = yield t.save();
            return requestedStock.toJSON();
        });
    }
    //return the new buying price average after a new transaction 
    calcNewAverage(currentAverage, currentAmount, purchaseAmount, purchasePrice) {
        return (currentAverage * currentAmount + (purchaseAmount * purchasePrice))
            / (currentAmount + purchaseAmount);
    }
};
__decorate([
    routing_controllers_1.Get("/all-stocks"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StockController.prototype, "getAllStocks", null);
__decorate([
    routing_controllers_1.Get("/user-stocks"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StockController.prototype, "getUserStocks", null);
__decorate([
    routing_controllers_1.Get("/stocks/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "getStock", null);
__decorate([
    routing_controllers_1.Get("/history"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StockController.prototype, "getHistory", null);
__decorate([
    routing_controllers_1.Get("/balance"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StockController.prototype, "getBalance", null);
__decorate([
    routing_controllers_1.Put("/new-balance"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "updateBalance", null);
__decorate([
    routing_controllers_1.Put("/update-stock/:id"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "updateUserStock", null);
__decorate([
    routing_controllers_1.Post("/transaction"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.Transaction]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "addToHistory", null);
StockController = __decorate([
    routing_controllers_1.JsonController()
], StockController);
exports.StockController = StockController;
//# sourceMappingURL=stock.controller.js.map