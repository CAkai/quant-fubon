import { FubonSDK, BSAction, TimeInForce, OrderType, PriceType, MarketType } from './index.js';
// const sdk = new FubonSDK("wss://x64.tera-asper.net/TASP/XCPXWS");
const sdk = new FubonSDK();
// sdk.stock.setOnOrder(function(order, content) { console.log("====order===",order, content)});
// sdk.stock.setOnOrderChanged(function(order, content) { console.log("===ordercha===", order, content)});
// sdk.stock.setOnFilled(function(order, content) { console.log(order, content)})
// sdk.stock.setOnEvent(function(order, content, lala) { console.log(order, content, lala)})

// const accounts = sdk.login("19630110FI", "a123456", "../19630110FI-TA-1.pfx", "12345678");


sdk.setOnFutoptOrder(function(err, data){
  console.log(err, data)
});

sdk.setOnOrder(function(err, data){
  console.log(err, data)
});

sdk.setOnEvent(function(code, message) {
  console.log(code, message)
});


// const accounts = sdk.dmaLogin("19630110FI", "a123456");
const accounts = sdk.login("F125604948", "ki89ZSEFgy","D:/workspace/ekey-trading/F125604948_20270303.p12","F125604948");

console.log(accounts);

if (!accounts.isSuccess) {
  console.error("Login failed:", accounts.message);
  process.exit(1);
}

// sdk.initRealtime();

// console.log(sdk.marketdata.webSocketClient)
// const wsStock = sdk.marketdata.webSocketClient.stock;
// // open the WebSocket connection and authenticate
// wsStock.connect().then(() => {
//   // subscribe the channel to receive streaming data
//   wsStock.subscribe({ channel: 'trades', symbol: '2330' });
// });

// wsStock.on('message', (message) => {
//   const data = JSON.parse(message);
//   console.log(data);
// });

// const { stock } = sdk.marketdata.restClient;

// const data = await stock.intraday.quote({ symbol: '2330' })
// console.log({data})
const target_user = accounts.data[0];
const order = {
  buySell: BSAction.Buy,
  symbol: "1101",
  price: "1.90",
  quantity: 2000,
  marketType: MarketType.Common,
  priceType: PriceType.Limit,
  timeInForce: TimeInForce.ROD,
  orderType: OrderType.Stock,
  memo: "from Js"
};



sdk.stock.placeOrder(accounts.data[0], order);



// const placeOrderPromise = (user, order) => {
//   return new Promise((resolve, reject) => {
//     resolve(sdk.stock.placeOrder(user, order, false))
//   });
// };



// const orderPromises = Array.from({ length: 10 }, () =>
//   placeOrderPromise(target_user, order)
// );

// Promise.all(orderPromises).then(function(data) {
//   console.log(data)
//   console.log('place all orders')
// });



// import { CoreSdk } from './index.js'
import * as readline from 'node:readline';

// //
// const token = process.env.FUGLE_REALTIME_APIKEY;
// const sdk = new CoreSdk("wss://api.fugle.tw/marketdata/v1.0/stock/streaming");
// console.log(sdk.authenticate(token));
// // console.log(sdk.subscribe('trades', '2330'));
// console.log(sdk.subscribe('trades', '2610'));
// console.log(sdk.subscribe('trades', '2618'));
// console.log(sdk.subscribe('trades', '2356'));

// function test() {



// }

// sdk.registerCallback((err, [value, event]) => {
//   sdk;
//   //console.log(JSON.parse(value),event)
//   //console.log(value)
//   console.log(JSON.parse(value))
// })


readline
    .createInterface(process.stdin, process.stdout)
    .question("Press [Enter] to exit...", function(){
        process.exit();
});
