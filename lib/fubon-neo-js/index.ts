// Re-export all types and values from trade.js
export * from './trade.js';

// Import what we need for FubonSDK implementation
import { CoreSdk, FugleRealtime } from './trade.js';
import { RestClient, WebSocketClient } from '@fugle/marketdata';
import { Mode, buildWebSocketClient, buildRestConfig } from './adapter.js';
import type { FutOptOrderResult, OrderResult } from './trade.js';

// Re-export Mode for external use
export { Mode };

import * as packageJson from "./package.json";
const version = packageJson.version;

class FubonSDK extends CoreSdk {
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
  constructor(
    pongInteval?: number | null,
    missedCount?: number | null,
    url?: string | null
  ) {
    super(version, pongInteval as any, missedCount as any, url);
    global.__fubon_sdk_ref__ = this;
  }

  /**
   * Initial market data and get authorised
   * @param mode - Speed or Normal mode (defaults to Speed)
   */
  initRealtime(mode = Mode.Speed) {
    const sdkToken = super.exchangeRealtimeToken();

    // Use adapter to build WebSocket client with channel validation
    const fugleRealtime = new FugleRealtime();
    const restConfig = buildRestConfig(sdkToken);

    this.marketdata = {
      webSocketClient: buildWebSocketClient(mode, sdkToken, fugleRealtime),
      restClient: new RestClient(restConfig),
    };
  }

  /**
   * add callback to Order
   * @param callback The callback function
   */
  setOnOrder(callback: (err: null | Error, event: OrderResult) => void) {
    super.innerSetOnOrder(function (_err: any, event: any) {
      if (event.isSuccess) {
        callback(null, event.data);
      } else {
        callback(new Error(event.message), event.data);
      }
    });
  }

  /**
   * add callback to OrderChanged
   * @param callback The callback function
   */
  setOnOrderChanged(
    callback: (err: null | Error, event: FutOptOrderResult) => void
  ) {
    super.innerSetOnOrderChanged(function (_err: any, event: any) {
      if (event.isSuccess) {
        callback(null, event.data);
      } else {
        callback(new Error(event.message), event.data);
      }
    });
  }

  /**
   * add callback to FutoptOrder
   * @param callback The callback function
   */
  setOnFutoptOrder(
    callback: (err: null | Error, event: FutOptOrderResult) => void
  ) {
    super.innerSetOnFutoptOrder(function (_err: any, event: any) {
      if (event.isSuccess) {
        callback(null, event.data);
      } else {
        callback(new Error(event.message), event.data);
      }
    });
  }

  /**
   * add callback to FutoptOrderChanged
   * @param callback The callback function
   */
  setOnFutoptOrderChanged(
    callback: (err: null | Error, event: FutOptOrderResult) => void
  ) {
    super.innerSetOnFutoptOrderChanged(function (_err: any, event: any) {
      if (event.isSuccess) {
        callback(null, event.data);
      } else {
        callback(new Error(event.message), event.data);
      }
    });
  }

  /**
   * add callback to Event
   * @param callback The callback function
   */
  setOnEvent(callback: (code: string, message: string) => void) {
    super.innerSetOnEvent(function (_err: any, event: [string, string]) {
      let [code, message] = event;
      callback(code, message);
    });
  }
}

// Export our custom SDK class
export { FubonSDK };
