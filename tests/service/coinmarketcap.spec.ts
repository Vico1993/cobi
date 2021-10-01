/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios'
import { CoinMarketCap } from './../../src/service/coinmarketcap'

const axiosGetSpy = jest.spyOn(axios, 'get')

/**
 * Mock of CMC response
 */
const mockCMCResponse = {
    data: {
        BTC: {
            quote: {
                CAD: {
                    price: 10000,
                },
            },
        },
    },
}

describe('CoinMarketCap@getAssetValue', () => {
    it('if debug set to true, will return a fake number less than 10k', async () => {
        const service = new CoinMarketCap({
            apiKey: process.env.COINMARKETCAP_API_KEY!,
            debug: true,
        })

        const res = await service.getAssetValue('BTC')

        expect(typeof res).toStrictEqual('number')
        expect(res).toBeLessThan(10000)
    })

    it('if call failed return null', async () => {
        axiosGetSpy.mockImplementation(async () =>
            Promise.reject(new Error('I WANT TO FAILED, BECAUSE I CAN')),
        )

        const service = new CoinMarketCap({
            apiKey: process.env.COINMARKETCAP_API_KEY!,
            currency: 'CAD',
        })

        const res = await service.getAssetValue('BTC')
        expect(res).toBeNull()
    })

    it('Happy path', async () => {
        axiosGetSpy.mockImplementation(async () =>
            Promise.resolve({ data: mockCMCResponse }),
        )

        const service = new CoinMarketCap({
            apiKey: process.env.COINMARKETCAP_API_KEY!,
            currency: 'CAD',
        })

        const res = await service.getAssetValue('BTC')

        expect(res).toStrictEqual(10000)
    })
})
