import { existsSync } from 'fs'
import { Command, flags } from '@oclif/command'
import { CONFIG_PATH, TRANSACTION_FINENAME } from '../constant'
import {
    jsonTransaction,
    Model as transactionModel,
} from '../domain/transaction'
import { initCoinMarketCap } from '../service'
import { resolve } from 'path'

/**
 * @param {CoinMarketCap}
 */
const coinMarketCapClient = initCoinMarketCap({
    debug: false,
})

const model = new transactionModel(coinMarketCapClient)

export class Transaction extends Command {
    static description = 'Transaction command'

    static flags = {
        help: flags.help({ char: 'h' }),
        list: flags.boolean({
            char: 'l',
            description: 'List all transaction saved',
        }),
    }

    async run(): Promise<void> {
        // check if transactions file exists
        if (!existsSync(`${CONFIG_PATH}/${TRANSACTION_FINENAME}`)) {
            this.error(
                'If i\'m correct, you didn\'t register any transactions yet, please check the "load" command, with cobi load --help to register your first transaction',
                {
                    exit: false,
                },
            )

            return
        }

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const data: jsonTransaction = require(resolve(
            `${CONFIG_PATH}/${TRANSACTION_FINENAME}`,
        ))

        const earn = data.earn
        const output = await model.buildOutput(data.transactions)
        const { details, ...analitycs } = model.calculateAnalytics(output)

        for (const asset in earn) {
            earn[asset].value = `${(
                earn[asset].quantity *
                ((await coinMarketCapClient.getAssetValue(asset)) as number)
            ).toFixed(2)} CAD`
        }

        console.log('-- TRANSACTIONS --')
        console.table(output)

        console.log('-- TOTAL by ASSET --')
        console.table(details)

        console.log('-- TOTAL by ASSET --')
        console.table(analitycs)

        console.log('-- EARN --')
        console.table(earn)

        this.exit()
    }
}
