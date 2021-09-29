export type earn = {
    [key: string]: {
        quantity: number
        value?: number
    }
}

/**
 * Transaction basic informations
 */
export type transactionEntity = {
    date: string
    quantity: number
    price: number
    asset: string
    assetPrice?: number
}

/**
 * WIP: Format of the data in the JSON for now.
 */
export type jsonTransaction = {
    transactions: transactionEntity[]
    earn: earn
}
