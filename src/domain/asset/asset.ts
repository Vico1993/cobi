import { assetEntity, transactionEntity } from "."

export class Asset {
    /**
     * @var {string}
     */
    public code: string

    /**
     * @var {transactionEntity[]}
     */
    private transactions?: transactionEntity[]

    constructor({
        code,
        transactions
    }: assetEntity) {
        this.code = code
        this.transactions = transactions
    }

    /**
     * Add a transaction for this ASSET
     *
     * @param {transactionEntity} transaction
     * @returns {Asset}
     */
    public addTransaction = (transaction: transactionEntity): Asset => {
        this.transactions?.push(
            transaction
        )

        return this
    }
}