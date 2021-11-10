import { assetEntity } from "."

export class Asset {
    public code: string
    public totalAmount: number

    constructor({
        totalAmount,
        code
    }: assetEntity) {
        this.code = code
        this.totalAmount = totalAmount
    }
}