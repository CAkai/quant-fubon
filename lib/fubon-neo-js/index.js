"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FubonSDK = exports.Mode = void 0;
// Re-export all types and values from trade.js
__exportStar(require("./trade.js"), exports);
// Import what we need for FubonSDK implementation
const trade_js_1 = require("./trade.js");
const marketdata_1 = require("@fugle/marketdata");
const adapter_js_1 = require("./adapter.js");
Object.defineProperty(exports, "Mode", { enumerable: true, get: function () { return adapter_js_1.Mode; } });
const packageJson = __importStar(require("./package.json"));
const version = packageJson.version;
class FubonSDK extends trade_js_1.CoreSdk {
    /**
     * constructor of FubonSDK
     * @param pongInteval
     * @param missedCount
     * @param url The first value
     */
    constructor(pongInteval, missedCount, url) {
        super(version, pongInteval, missedCount, url);
        global.__fubon_sdk_ref__ = this;
    }
    /**
     * Initial market data and get authorised
     * @param mode - Speed or Normal mode (defaults to Speed)
     */
    initRealtime(mode = adapter_js_1.Mode.Speed) {
        const sdkToken = super.exchangeRealtimeToken();
        // Use adapter to build WebSocket client with channel validation
        const fugleRealtime = new trade_js_1.FugleRealtime();
        const restConfig = (0, adapter_js_1.buildRestConfig)(sdkToken);
        this.marketdata = {
            webSocketClient: (0, adapter_js_1.buildWebSocketClient)(mode, sdkToken, fugleRealtime),
            restClient: new marketdata_1.RestClient(restConfig),
        };
    }
    /**
     * add callback to Order
     * @param callback The callback function
     */
    setOnOrder(callback) {
        super.innerSetOnOrder(function (_err, event) {
            if (event.isSuccess) {
                callback(null, event.data);
            }
            else {
                callback(new Error(event.message), event.data);
            }
        });
    }
    /**
     * add callback to OrderChanged
     * @param callback The callback function
     */
    setOnOrderChanged(callback) {
        super.innerSetOnOrderChanged(function (_err, event) {
            if (event.isSuccess) {
                callback(null, event.data);
            }
            else {
                callback(new Error(event.message), event.data);
            }
        });
    }
    /**
     * add callback to FutoptOrder
     * @param callback The callback function
     */
    setOnFutoptOrder(callback) {
        super.innerSetOnFutoptOrder(function (_err, event) {
            if (event.isSuccess) {
                callback(null, event.data);
            }
            else {
                callback(new Error(event.message), event.data);
            }
        });
    }
    /**
     * add callback to FutoptOrderChanged
     * @param callback The callback function
     */
    setOnFutoptOrderChanged(callback) {
        super.innerSetOnFutoptOrderChanged(function (_err, event) {
            if (event.isSuccess) {
                callback(null, event.data);
            }
            else {
                callback(new Error(event.message), event.data);
            }
        });
    }
    /**
     * add callback to Event
     * @param callback The callback function
     */
    setOnEvent(callback) {
        super.innerSetOnEvent(function (_err, event) {
            let [code, message] = event;
            callback(code, message);
        });
    }
}
exports.FubonSDK = FubonSDK;
