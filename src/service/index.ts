import { CoinMarketCapOptions } from "./types";
import { CoinMarketCap } from "./coinmarketcap";
import { config } from "dotenv";

// Check env var
config();

/**
 * Will instantiate the CoinMarketCap api client with parameters
 *
 * @param {Omit<CoinMarketCapOptions, 'apiKey'>} opts Every option exept for the APIKey who it's added here
 * @returns {CoinMarketCap}
 */
export const initCoinMarketCap = (
    opts?: Omit<CoinMarketCapOptions, "apiKey">
): CoinMarketCap => {
    return new CoinMarketCap({
        ...opts,
        apiKey: process.env.COINMARKETCAP_API_KEY as string,
    });
};
