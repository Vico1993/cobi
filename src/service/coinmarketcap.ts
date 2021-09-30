import { CoinMarketCapClient } from '../client/coinmarketcapclient'
import { CoinMarketCapOptions } from './types'
import faker from 'faker'

export class CoinMarketCap {
    /**
     * Api client
     *
     * @type {CoinMarketCapClient}
     */
    private client: CoinMarketCapClient

    /**
     * Activate or deactivate debug mode
     *
     * @type {Boolean}
     */
    private debug = false

    /**
     * Devise to get data too
     *
     * @type {string}
     */
    private currency = 'CAD'

    /**
     * Small cache system to not query CoinMarketCap everytime for the same asset
     *
     * @type {Record<string, number>}
     * @todo: Improve ?
     */
    private assetMemory: Record<string, number> = {}

    constructor(opts: CoinMarketCapOptions) {
        this.client = new CoinMarketCapClient({
            apiKey: opts.apiKey,
        })

        if (opts.debug) {
            this.debug = opts.debug
        }

        if (opts.currency) {
            this.currency = opts.currency
        }
    }

    /**
     * Get current value of Asset
     *
     * @param {string} asset Asset code, like: BTC
     * @returns {Promise<number | undefined>}
     * @todo: Log error somewhere
     */
    public getAssetValue = async (asset: string): Promise<number | null> => {
        if (this.debug) {
            return faker.datatype.number(10000)
        }

        if (typeof this.assetMemory[asset] === 'undefined') {
            try {
                const response = await this.client.getAssetValue(
                    asset,
                    this.currency,
                )

                this.assetMemory[asset] =
                    response.data[asset].quote[this.currency].price
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Coinmarketcap error: ', error)
            }
        }

        return this.assetMemory[asset] || null
    }
}
