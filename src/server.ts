const SECOND = 1000;

import { Stock, UserStock, UserBalance} from './model';
import * as io from 'socket.io-client';
import {createExpressServer} from "routing-controllers";
import {sequelize} from './sequelize';
import { StockController } from './API/stock.controller'

const app = createExpressServer({
  cors: true,
  controllers: [StockController],
}); 
const server = require('http').createServer(app);
var io = require('socket.io')(server);
const port: number = 3000;

//initialize stocks, balance and price update intervals
sequelize.sync({ force: true }).then(() => {
  generateStocks();
  generateBalance();
  setInterval(updatePrices, 10*SECOND);
})
server.listen(port, () => {
  console.log('server on')

  io.on('connection', function (client) {

    console.log('client connected')

    client.on('disconnect', function () {
      console.log('client disconnected')

    });
  });
})

const generateStocks = async function () {
  let stocks = await Stock.find();
  if (!stocks) {
    const s1 = new Stock({name:'s1', value:100, lastValue:33, openValue:10 })
    const s2 = new Stock({name:'s2',value:200, lastValue:122, openValue:20 })
    const s3 = new Stock({name:'s3',value:300, lastValue:911, openValue:30 })
    const s4 = new Stock({name:'s4',value:400, lastValue:374, openValue:40 })
    const s5 = new Stock({name:'s5',value:500, lastValue:639, openValue:50 })

    await s1.save();
    await s2.save();
    await s3.save();
    await s4.save();
    await s5.save();
  }
}

const generateBalance = async function(){
  let newBalane = new UserBalance({id:1, value:1000});
  await newBalane.save();
}

const updatePrices = async function () {
  let stocks = await Stock.findAll();
  let userStocks = await UserStock.findAll();
  stocks.forEach(async element => {
    let newValue: number = Math.floor(1 + (Math.random() * 100));
    let lastValue:number = element.value;
    await Stock.update({value:newValue, lastValue:lastValue}, {where: {name:element.name}});
  })


  //check correct values
  userStocks.forEach(async element => {
    let stock = await Stock.findById(element.name); 
    await UserStock.update({value: stock.value}, {where: {name: element.name}});
  })

  const updatedStocks = await Stock.findAll({order:[['name', 'ASC']]});

  io.emit('stocks-prices-update', updatedStocks);
}
