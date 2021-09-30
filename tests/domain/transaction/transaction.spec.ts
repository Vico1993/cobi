import {
    Transaction,
    transactionEntity,
} from './../../../src/domain/transaction'

const transactionMock: transactionEntity = {
    date: '2021-10-03',
    asset: 'BTC',
    quantity: 0.5,
    price: 200,
}

describe('Transaction@constructor', () => {
    it('If no assetPrice set get one', () => {
        const transaction = new Transaction(transactionMock)

        expect(transaction.assetPrice).toBe(400)
    })

    it('If assetPrice set, use it', () => {
        const transaction = new Transaction({
            ...transactionMock,
            assetPrice: 200,
        })

        expect(transaction.assetPrice).toBe(200)
    })

    it('check date to be in the correct timzone - forced UTC for now', () => {
        const transaction = new Transaction(transactionMock)

        expect(transaction.date).toStrictEqual(transactionMock.date)
    })
})
