import { Command, flags } from '@oclif/command'
import { resolve } from 'path'
import { existsSync } from 'fs'
import { question, readFromCSV } from '../utils'
import {
    input as CryptoComInput,
    Parser as CryptoComParser,
} from '../domain/cryptoCom'
import { Model } from '../domain/transaction'
import { initCoinMarketCap } from '../service'

const transactionModel = new Model(
    initCoinMarketCap({
        debug: false,
    }),
)

export class Load extends Command {
    static description = 'Load transaction from services'

    static flags = {
        help: flags.help({ char: 'h' }),
        cryptoDotCom: flags.boolean({
            description:
                'Load transaction from crypto.com website. Will require export CSV.',
        }),
    }

    async run(): Promise<void> {
        let data: CryptoComInput[] = []
        const { cryptoDotCom } = this.parse(Load).flags

        if (!cryptoDotCom) {
            this.log(
                'Sorry for now I support only Crypto.com, please run again with --cryptoDotCom',
            )
        }

        const filepath = await question(
            'I need to have the CSV export from Crypto.com. Can you share with me the filepath? ( ex: ./cobi/super/path/dot.csv ): ',
        )

        if (!existsSync(resolve(filepath))) {
            this.error(
                new Error(`Sorry.. I couldn't find your file at: ${filepath}`),
                {
                    exit: false,
                },
            )

            return
        }

        data = await readFromCSV<CryptoComInput>(resolve(filepath))

        const cryptoParser = new CryptoComParser(data)

        // Save informations parsed
        transactionModel.saveToJson(cryptoParser.export())

        this.log('transaction saved from crypto.com')
    }
}
