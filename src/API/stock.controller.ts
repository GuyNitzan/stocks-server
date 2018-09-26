import {JsonController, Param, Body, Get, Post, Put, Delete, Controller} from "routing-controllers";
import { Stock, UserStock, Transaction, UserBalance } from '../model';

@JsonController()
export class StockController {

    //return all stocks that are in the market
    @Get("/all-stocks")
    async getAllStocks() {
        const stocks:Array<Stock> = await Stock.findAll({
            order: [
                ['name' , 'ASC']
            ]
        });
        return stocks.map(s => s.toJSON());
    }

    //return all user stocks that are currently in account
    @Get("/user-stocks")
    async getUserStocks() {
        const stocks:Array<UserStock> = await UserStock.findAll();
        return stocks.map(s => s.toJSON());
    }

    //return a specific stock
    @Get("/stocks/:id")
    async getStock(@Param("id") id: string) {
        const requestedStock:Stock = await Stock.findById(id);
        return  requestedStock.toJSON();
    }

    // return a transaction history log
    @Get("/history")
    async getHistory() {
        const history:Array<Transaction> = await Transaction.findAll();
        return  history.map(s => s.toJSON());
    }

    //return the balance of the user
    @Get("/balance")
    async getBalance() {
        const balance: UserBalance = await UserBalance.findById(1);
        return  balance.toJSON();
    }

    //update the balance with a given delta (could be negative/positive)
    @Put("/new-balance")
    async updateBalance(@Body() change: any) {
        let currentBalance = await UserBalance.findById(1);
        currentBalance.value += change.change;
        return await currentBalance.save().toJSON();
    }

    //update the amount of a user-stock in the account 
    //+ buying price average for this stock
    @Put("/update-stock/:id")
    async updateUserStock(@Param("id") stockName: string, @Body() body: any) {
        let stock = await Stock.findByPrimary(stockName);
        let usrStock = await UserStock.findByPrimary(stockName);
        if (usrStock){
            if (body.amount >= 0){
            usrStock.averagePurchasePrice = this.calcNewAverage(usrStock.averagePurchasePrice,
                usrStock.amount, body.amount, body.price);
            }
            usrStock.amount += body.amount;
        }
        else {
            console.log('creating new user stock');
            usrStock = new UserStock({name: stockName,amount: body.amount,
                value: stock.value, averagePurchasePrice: body.price});
        }
        return await usrStock.save().toJSON();
    }
    
    //add a new transaction to history
    @Post("/transaction")
    async addToHistory(@Body() t: Transaction) {
        const requestedStock:any = await t.save();
        return  requestedStock.toJSON();
    }

    //return the new buying price average after a new transaction 
    calcNewAverage(currentAverage: number, currentAmount: number, 
        purchaseAmount: number, purchasePrice: number){
            return (currentAverage*currentAmount + (purchaseAmount*purchasePrice))
                / (currentAmount+purchaseAmount);
    }

}