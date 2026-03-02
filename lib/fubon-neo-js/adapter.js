"use strict";
/**
 * Adapter layer for converting Mode enum to WebSocket configuration
 * This preserves backward compatibility while using the parameterized SDK
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mode = void 0;
exports.buildWebSocketConfig = buildWebSocketConfig;
exports.buildRestConfig = buildRestConfig;
exports.buildWebSocketClient = buildWebSocketClient;
const marketdata_1 = require("@fugle/marketdata");
/**
 * Mode enum for backward compatibility
 * Maps to different WebSocket endpoint URLs
 */
var Mode;
(function (Mode) {
    Mode["Speed"] = "speed";
    Mode["Normal"] = "normal";
})(Mode || (exports.Mode = Mode = {}));
/**
 * Build WebSocket configuration from Mode enum
 * Converts legacy Mode-based API to new healthCheck config
 *
 * @param mode - Speed or Normal mode
 * @param sdkToken - SDK authentication token
 * @param fugleRealtime - Rust FugleRealtime class instance for URL retrieval
 * @returns Configuration object for WebSocket client
 */
function buildWebSocketConfig(mode, sdkToken, fugleRealtime // FugleRealtime from Rust binding
) {
    // Get the appropriate base URL based on mode
    const baseUrl = mode === Mode.Speed
        ? fugleRealtime.realtimeWsSpeedUrl
        : fugleRealtime.realtimeWsNormalUrl;
    return {
        baseUrl: `${baseUrl}/v1.0`, // Use baseUrl instead of url
        sdkToken,
        healthCheck: {
            enabled: true, // Always enable for Fubon customers
            pingInterval: 30000, // 30 seconds
            maxMissedPongs: 2 // Disconnect after 2 missed pongs
        }
    }; // Cast needed since ClientOptions doesn't formally include baseUrl in WebSocketClientOptions
}
/**
 * Build REST client configuration
 *
 * @param sdkToken - SDK authentication token
 * @returns Configuration object for REST client
 */
function buildRestConfig(sdkToken) {
    return { sdkToken };
}
/**
 * Wrapper for WebSocketStockClient with Speed mode channel validation
 * Preserves Fubon-specific channel restrictions for Speed mode
 */
class WebSocketStockClientWrapper {
    constructor(client, mode) {
        this._client = client;
        this._mode = mode;
    }
    subscribe(params) {
        // Speed mode doesn't support 'aggregates' and 'candles' channels
        if (this._mode === Mode.Speed) {
            if (params.channel === 'aggregates' || params.channel === 'candles') {
                throw new Error(`Speed mode doesn't support ${params.channel} channel`);
            }
        }
        return this._client.subscribe(params);
    }
    // Delegate all other methods to the original client
    unsubscribe(params) { return this._client.unsubscribe(params); }
    disconnect() { return this._client.disconnect(); }
    connect() { return this._client.connect(); }
    ping(params) { return this._client.ping(params); }
    subscriptions() { return this._client.subscriptions(); }
    // EventEmitter methods
    on(event, listener) { return this._client.on(event, listener); }
    once(event, listener) { return this._client.once(event, listener); }
    off(event, listener) { return this._client.off(event, listener); }
    emit(event, ...args) { return this._client.emit(event, ...args); }
}
/**
 * Wrapper for WebSocketFutOptClient with Speed mode channel validation
 * Preserves Fubon-specific channel restrictions for Speed mode
 */
class WebSocketFutOptClientWrapper {
    constructor(client, mode) {
        this._client = client;
        this._mode = mode;
    }
    subscribe(params) {
        // Speed mode doesn't support 'aggregates' and 'candles' channels
        if (this._mode === Mode.Speed) {
            if (params.channel === 'aggregates' || params.channel === 'candles') {
                throw new Error(`Speed mode doesn't support ${params.channel} channel`);
            }
        }
        return this._client.subscribe(params);
    }
    // Delegate all other methods to the original client
    unsubscribe(params) { return this._client.unsubscribe(params); }
    disconnect() { return this._client.disconnect(); }
    connect() { return this._client.connect(); }
    ping(params) { return this._client.ping(params); }
    subscriptions() { return this._client.subscriptions(); }
    // EventEmitter methods
    on(event, listener) { return this._client.on(event, listener); }
    once(event, listener) { return this._client.once(event, listener); }
    off(event, listener) { return this._client.off(event, listener); }
    emit(event, ...args) { return this._client.emit(event, ...args); }
}
/**
 * Build WebSocket client with Mode-based configuration and channel validation
 *
 * @param mode - Speed or Normal mode
 * @param sdkToken - SDK authentication token
 * @param fugleRealtime - Rust FugleRealtime class instance for URL retrieval
 * @returns WebSocketClient instance with wrapped stock client for Speed mode validation
 */
function buildWebSocketClient(mode, sdkToken, fugleRealtime) {
    const config = buildWebSocketConfig(mode, sdkToken, fugleRealtime);
    const client = new marketdata_1.WebSocketClient(config);
    // Cache wrappers to avoid creating new instances on each access
    let cachedStockWrapper = null;
    let cachedFutOptWrapper = null;
    // Use Proxy to intercept property access
    return new Proxy(client, {
        get(target, prop, receiver) {
            // Intercept 'stock' property to return wrapped client
            if (prop === 'stock') {
                if (!cachedStockWrapper) {
                    const originalStock = target.stock;
                    cachedStockWrapper = new WebSocketStockClientWrapper(originalStock, mode);
                }
                return cachedStockWrapper;
            }
            // Intercept 'futopt' property to return wrapped client
            if (prop === 'futopt') {
                if (!cachedFutOptWrapper) {
                    const originalFutOpt = target.futopt;
                    cachedFutOptWrapper = new WebSocketFutOptClientWrapper(originalFutOpt, mode);
                }
                return cachedFutOptWrapper;
            }
            // For all other properties, return original value
            const value = Reflect.get(target, prop, receiver);
            // If it's a function, bind it to the target to preserve 'this'
            if (typeof value === 'function') {
                return value.bind(target);
            }
            return value;
        }
    });
}
