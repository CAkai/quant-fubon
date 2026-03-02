export * from './trade.js';
import { CoreSdk } from './trade.js';
import { RestClient, WebSocketClient } from '@fugle/marketdata';
import { Mode } from './adapter.js';
import type { FutOptOrderResult, OrderResult } from './trade.js';
export { Mode };
declare class FubonSDK extends CoreSdk {
    marketdata: {
        webSocketClient: WebSocketClient;
        restClient: RestClient;
    };
    /**
     * constructor of FubonSDK
     * @param pongInteval
     * @param missedCount
     * @param url The first value
     */
    constructor(pongInteval?: number | null, missedCount?: number | null, url?: string | null);
    /**
     * Initial market data and get authorised
     * @param mode - Speed or Normal mode (defaults to Speed)
     */
    initRealtime(mode?: Mode): void;
    /**
     * add callback to Order
     * @param callback The callback function
     */
    setOnOrder(callback: (err: null | Error, event: OrderResult) => void): void;
    /**
     * add callback to OrderChanged
     * @param callback The callback function
     */
    setOnOrderChanged(callback: (err: null | Error, event: FutOptOrderResult) => void): void;
    /**
     * add callback to FutoptOrder
     * @param callback The callback function
     */
    setOnFutoptOrder(callback: (err: null | Error, event: FutOptOrderResult) => void): void;
    /**
     * add callback to FutoptOrderChanged
     * @param callback The callback function
     */
    setOnFutoptOrderChanged(callback: (err: null | Error, event: FutOptOrderResult) => void): void;
    /**
     * add callback to Event
     * @param callback The callback function
     */
    setOnEvent(callback: (code: string, message: string) => void): void;
}
export { FubonSDK };
