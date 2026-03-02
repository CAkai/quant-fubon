/**
 * Adapter layer for converting Mode enum to WebSocket configuration
 * This preserves backward compatibility while using the parameterized SDK
 */
import { WebSocketClient } from '@fugle/marketdata';
import type { WebSocketClientOptions } from '@fugle/marketdata';
/**
 * Mode enum for backward compatibility
 * Maps to different WebSocket endpoint URLs
 */
export declare enum Mode {
    Speed = "speed",
    Normal = "normal"
}
/**
 * Build WebSocket configuration from Mode enum
 * Converts legacy Mode-based API to new healthCheck config
 *
 * @param mode - Speed or Normal mode
 * @param sdkToken - SDK authentication token
 * @param fugleRealtime - Rust FugleRealtime class instance for URL retrieval
 * @returns Configuration object for WebSocket client
 */
export declare function buildWebSocketConfig(mode: Mode, sdkToken: string, fugleRealtime: any): Partial<WebSocketClientOptions>;
/**
 * Build REST client configuration
 *
 * @param sdkToken - SDK authentication token
 * @returns Configuration object for REST client
 */
export declare function buildRestConfig(sdkToken: string): {
    sdkToken: string;
};
/**
 * Build WebSocket client with Mode-based configuration and channel validation
 *
 * @param mode - Speed or Normal mode
 * @param sdkToken - SDK authentication token
 * @param fugleRealtime - Rust FugleRealtime class instance for URL retrieval
 * @returns WebSocketClient instance with wrapped stock client for Speed mode validation
 */
export declare function buildWebSocketClient(mode: Mode, sdkToken: string, fugleRealtime: any): WebSocketClient;
