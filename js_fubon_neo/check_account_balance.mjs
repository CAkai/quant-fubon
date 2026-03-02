import 'dotenv/config';
import { FubonSDK } from 'fubon-neo';

const sdk = new FubonSDK();

const accounts = sdk.login(
  process.env.USER_ID,
  process.env.USER_PASSWORD,
  process.env.CERT_PATH,
  process.env.CERT_PASSWORD
);

if (!accounts.isSuccess) {
  console.error('Login failed:', accounts.message);
  process.exit(1);
}

const acc = accounts.data[0];

// 庫存查詢
const inventoryResult = sdk.accounting.inventories(acc);

if (inventoryResult.isSuccess) {
  console.log(`庫存筆數: ${inventoryResult.data.length}\n`);
  inventoryResult.data.forEach((inv, i) => {
    console.log(`第 ${i + 1} 筆`);
    console.log(inv);
    console.log();
  });
} else {
  console.error('庫存查詢失敗:', inventoryResult.message);
}

// 銀行餘額
const bankResult = sdk.accounting.bankRemain(acc);
console.log('銀行餘額:', bankResult);
