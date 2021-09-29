import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { CONFIG_PATH, TRANSACTION_FINENAME } from '../../constant'
import {
    jsonTransaction,
    transactionOutput,
    analyticsOutput,
    analyticsDetailOutput,
    transactionEntity,
} from '.'
import { CoinMarketCap } from '../../service/coinmarketcap'

export class Model {
    private coinmarketcapClient: CoinMarketCap

    constructor(coinmarketCapClient: CoinMarketCap) {
        this.coinmarketcapClient = coinmarketCapClient
    }

    /**
     * @param {jsonTransaction} data
     * @returns {void}
     */
    saveToJson = (data: jsonTransaction): void => {
        // check if cobi config folder exists
        if (!existsSync(CONFIG_PATH)) {
            mkdirSync(CONFIG_PATH)
        }

        // For now override informations...
        // Need to find a better solutions
        writeFileSync(
            `${CONFIG_PATH}/${TRANSACTION_FINENAME}`,
            JSON.stringify(data),
        )
    }

    /**
     * @param {transactionEntity[]} data
     * @return {Promise<transactionOutput[]>}
     */
    buildOutput = async (
        data: transactionEntity[],
    ): Promise<transactionOutput[]> => {
        const output: transactionOutput[] = []

        for (const transaction of data) {
            const assetValue = await this.coinmarketcapClient.getAssetValue(
                transaction.asset,
            )

            if (!assetValue) {
                // eslint-disable-next-line no-console
                console.error(
                    `CoinMarketCap doesn't any value for: ${transaction.asset}`,
                )
                continue
            }

            const price = assetValue * transaction.quantity

            output.push({
                ...transaction,
                assetCurrentPrice: assetValue,
                currentPrice: parseFloat(price.toFixed(2)),
                diff: `${this.calculateCapitalGain(
                    transaction.price,
                    price,
                )} %`,
            })
        }

        return output
    }

    /**
     * Loop threw transactions to get some analytics informations
     *
     * @param {transactionOutput[]} transactions
     * @return {analyticsOutput}
     */
    public calculateAnalytics = (
        transactions: transactionOutput[],
    ): analyticsOutput => {
        let totalInvest = 0
        let currentPrice = 0
        const details: analyticsDetailOutput = {}

        for (const transaction of transactions) {
            totalInvest += transaction.price
            currentPrice += transaction.currentPrice

            if (details[transaction.asset]) {
                details[transaction.asset] = {
                    totalInvest: (details[transaction.asset].totalInvest +=
                        transaction.price),
                    currentPrice: (details[transaction.asset].currentPrice +=
                        transaction.currentPrice),
                    diff: `${this.calculateCapitalGain(
                        totalInvest,
                        currentPrice,
                    )} %`,
                }
            } else {
                details[transaction.asset] = {
                    totalInvest: transaction.price,
                    currentPrice: transaction.currentPrice,
                    diff: `${this.calculateCapitalGain(
                        transaction.price,
                        transaction.currentPrice,
                    )} %`,
                }
            }
        }

        return {
            currentPrice,
            totalInvest,
            diff: `${this.calculateCapitalGain(totalInvest, currentPrice)} %`,
            details: details,
        }
    }

    /**
     * Calculate capital gain
     *
     * @param {number} startPrice
     * @param {number} endPrice
     * @returns {string}
     */
    private calculateCapitalGain = (
        startPrice: number,
        endPrice: number,
    ): string => {
        return (((endPrice - startPrice) / startPrice) * 100).toFixed(2)
    }
}
