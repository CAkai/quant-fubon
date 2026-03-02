import 'dotenv/config';
import { FubonSDK } from 'fubon-neo';

const sdk = new FubonSDK();

const accounts = sdk.login(
  process.env.USER_ID!,
  process.env.USER_PASSWORD!,
  process.env.CERT_PATH!,
  process.env.CERT_PASSWORD!
);  // 登入帳號 輸入:帳號、密碼、憑證路徑、憑證密碼

console.log(accounts);