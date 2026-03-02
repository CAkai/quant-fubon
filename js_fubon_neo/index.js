import * as dotenv from 'dotenv';
import { FubonSDK, BSAction, TimeInForce, OrderType, PriceType, MarketType } from 'fubon-neo';

dotenv.config(); 

const userid = process.env.USER_ID;
const userpassword = process.env.USER_PASSWORD;
const cert_path = process.env.CERT_PATH;
const cert_password = process.env.CERT_PASSWORD;

// Initialize the SDK
const sdk = new FubonSDK();

//登入
var accounts = sdk.login(userid, userpassword, cert_path, cert_password);  // 登入帳號 輸入:帳號、密碼、憑證路徑、憑證密碼
console.log(accounts)