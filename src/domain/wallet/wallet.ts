import { walletEntity } from ".";
import { assetEntity } from "../asset";

export class Wallet {
    /**
     * @var {assetEntity[]}
     */
    private assets: assetEntity[]

    constructor({
        assets,
    }: walletEntity) {
        this.assets = assets
    }

    /**
     * Will return asset entity linked to the code unless it's not found
     *
     * @param {string} code
     * @returns {assetEntity | undefined}
     */
    public getAsset = (code: string): assetEntity | undefined => {
        return this.assets.find((asset) => asset.code.toLocaleLowerCase() === code.toLocaleLowerCase())
    }
}