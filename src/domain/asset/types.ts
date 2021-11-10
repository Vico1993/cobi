export type assetEntity = {
    code: string
    transactions?: transactionEntity[]
}

/**
 * @todo: MOVE IT
 * @todo: implement FROM
 */
export type transactionEntity = {
    assetCode: string
    date: string
    quantity: number
    price: number
    from?: string
    currency?: string
    assetPrice?: number
}