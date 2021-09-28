import { Command, flags } from '@oclif/command'
import { resolve } from 'path'
import { existsSync } from 'fs'
import { question, readFromCSV } from '../utils'
import { input as CryptoDotComInput } from '../domain/cryptoDotCom'

export class Load extends Command {
    static description = 'Load transaction from services'

    static flags = {
        help: flags.help({ char: 'h' }),
        cryptoDotCom: flags.boolean({
            description:
                'Load transaction from crypto.com website. Will require export CSV.',
        }),
    }

    async run() {
        let data: CryptoDotComInput[] = []
        const { cryptoDotCom } = this.parse(Load).flags

        if (cryptoDotCom) {
            let filepath = await question(
                'I need to have the CSV export from Crypto.com. Can you share with me the filepath? ( ex: ./cobi/super/path/dot.csv ): ',
            )

            if (!existsSync(resolve(filepath))) {
                this.error(
                    new Error(
                        `Sorry.. I couldn\'t find your file at: ${filepath}`,
                    ),
                    {
                        exit: false,
                    },
                )

                return
            }

            data = await readFromCSV<CryptoDotComInput>(resolve(filepath))
        }

        console.log(data)

        // this.log(`hello world transaction command... Coming soon`)
    }
}
