import { Wallet } from "./../../../src/domain/wallet"
import { assetEntity } from "./../../../src/domain/asset"

const btcAsset: assetEntity = {
    code: "BTC"
}

const assets: assetEntity[] = [btcAsset];

describe('Wallet@getAsset', () => {
    it('Asset found', () => {
        const myWallet = new Wallet({
            assets: assets
        })

        expect(myWallet.getAsset("BTC")).toStrictEqual(btcAsset)
    })

    it('Asset found even with lowerCase', () => {
        const myWallet = new Wallet({
            assets: assets
        })

        expect(myWallet.getAsset("btc")).toStrictEqual(btcAsset)
    })

    it('Asset not found', () => {
        const myWallet = new Wallet({
            assets: assets
        })

        expect(myWallet.getAsset("ETH")).toBeUndefined()
    })
})
