export type earn = {
    [key: string]: {
        quantity: number
        value?: string
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
 *
 */
export type analyticsDetailOutput = {
    [key: string]: analyticsOutput
}

export type analyticsOutput = {
    totalInvest: number
    currentPrice: number
    diff: string
    details?: analyticsDetailOutput
}

export type transactionOutput = transactionEntity & {
    assetCurrentPrice: number
    currentPrice: number
    diff: string
}

/**
 * WIP: Format of the data in the JSON for now.
 */
export type jsonTransaction = {
    transactions: transactionEntity[]
    earn: earn
}
