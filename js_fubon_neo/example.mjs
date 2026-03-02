import 'dotenv/config';
import { FubonSDK, BSAction, TimeInForce, OrderType, PriceType, MarketType } from 'fubon-neo';

const sdk = new FubonSDK();

sdk.setOnFutoptOrder(function(err, data) {
  console.log(err, data);
});

sdk.setOnOrder(function(err, data) {
  console.log(err, data);
});

sdk.setOnEvent(function(code, message) {
  console.log(code, message);
});

const accounts = sdk.login(
  process.env.USER_ID,
  process.env.USER_PASSWORD,
  process.env.CERT_PATH,
  process.env.CERT_PASSWORD
);

console.log(accounts);

if (!accounts.isSuccess) {
  console.error('Login failed:', accounts.message);
  process.exit(1);
}

const acc = accounts.data[0];
console.log('Logged in as:', acc);
