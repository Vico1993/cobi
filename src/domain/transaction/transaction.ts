import { transactionEntity } from '.'

export class transaction implements transactionEntity {
    public date: string
    public price: number
    public asset: string
    public quantity: number
    public assetPrice: number

    constructor({
        date,
        asset,
        quantity,
        price,
        assetPrice,
    }: transactionEntity) {
        this.date = new Date(date).toLocaleDateString('en-ca')
        this.price = price
        this.asset = asset
        this.quantity = quantity

        if (!assetPrice) {
            this.assetPrice = this.getAssetPrice(this.quantity, this.price)
        } else {
            this.assetPrice = assetPrice
        }
    }

    /**
     * If no asstPrice return from services
     * Get it from price and quantity
     *
     * @param {number} quantity
     * @param {number} price
     * @returns {number}
     */
    private getAssetPrice = (quantity: number, price: number): number => {
        return (1 * price) / quantity
    }
}
