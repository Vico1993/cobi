import { input } from '.'
import { transaction, earn, jsonTransaction } from '../transaction'

export class parser {
    /**
     * @var {earn}
     */
    private earn: earn = {}

    /**
     * @var {transaction[]}
     */
    private transactions: transaction[] = []

    /**
     * @param {input[]} data
     */
    constructor(data: input[]) {
        // Parsing CSV data
        this.parse(data)
    }

    /**
     * Parse transaction from crypto.com CSV
     *
     * @param {input[]} data
     */
    private parse = (data: input[]) => {
        // Old to new
        for (const row of data.reverse()) {
            // Right now just deal with simple purchase
            if (row['Transaction Kind'] === 'crypto_purchase') {
                if (row.Currency === 'ERD') {
                    continue
                }

                this.transactions.push(
                    new transaction({
                        date: row['Timestamp (UTC)'],
                        quantity: row.Amount,
                        asset: row.Currency,
                        price: Number(row['Native Amount']),
                    }),
                )
            }

            if (row['Transaction Kind'] === 'crypto_earn_interest_paid') {
                if (!this.earn[row.Currency]) {
                    this.earn[row.Currency] = {
                        quantity: Number(row.Amount),
                    }
                } else {
                    this.earn[row.Currency].quantity += Number(row.Amount)
                }
            }
        }
    }

    /**
     * Export crypto.com information to be saved in the JSON
     *
     * @returns {jsonTransaction}
     */
    public export = (): jsonTransaction => ({
        transactions: this.transactions,
        earn: this.earn,
    })
}
