import { transactionEntity } from ".";

export class Transaction implements transactionEntity {
    public assetCode: string
    public quantity: number
    public date: string
    public price: number
    public from?: string
    public currency: string
    public assetPrice: number

    constructor({
        assetCode,
        quantity,
        date,
        price,
        from,
        currency,
        assetPrice
    }: transactionEntity) {
        this.assetCode = assetCode
        this.quantity = quantity
        this.date = date
        this.price = price

        // Default to CAD for now
        this.currency = "CAD"

        if (from) {
            this.from = from
        }

        if (currency) {
            this.currency = currency
        }

        if (!assetPrice) {
            this.assetPrice = this.getAssetPrice()
        } else {
            this.assetPrice = assetPrice
        }
    }

    /**
     * If no asstPrice return from services
     * Get it from price and quantity
     *
     * @returns {number}
     */
    private getAssetPrice = (): number => {
        return (1 * this.price) / this.quantity
    }
}