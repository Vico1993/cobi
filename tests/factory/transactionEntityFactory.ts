import faker from 'faker'
import { Transaction } from '../../src/domain/transaction'

/**
 * Build a fake transaction with faker.
 * Can be override with opts parameters
 *
 * @param {transactionEntity} opts
 * @returns {transaction}
 */
export const transactionFactory = (
    opts?: Record<string, string | number>,
): Transaction => {
    return new Transaction({
        date: faker.date.past().toDateString(),
        price: faker.datatype.number(),
        asset: faker.finance.currencyCode(),
        quantity: faker.datatype.float(2),
        assetPrice: faker.datatype.number(),
        ...opts,
    })
}
