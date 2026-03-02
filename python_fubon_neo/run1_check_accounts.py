import os
import fubon_neo
from fubon_neo.sdk import FubonSDK, Order
from fubon_neo.constant import TimeInForce, OrderType, PriceType, MarketType, BSAction
from dotenv import load_dotenv
load_dotenv()

USER_ID = os.getenv('USER_ID')
USER_PASSWORD = os.getenv('USER_PASSWORD')
CERT_PATH = os.getenv('CERT_PATH')
CERT_PASSWORD = os.getenv('CERT_PASSWORD')

def main():

    # 連結 API Server
    sdk = FubonSDK()
    accounts = sdk.login(USER_ID, USER_PASSWORD, CERT_PATH, CERT_PASSWORD)   # 登入帳號 輸入:帳號、密碼、憑證路徑、憑證密碼
    print(accounts)

if __name__ == "__main__":
    main()