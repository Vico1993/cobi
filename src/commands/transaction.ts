import { Command, flags } from '@oclif/command'

export class Transaction extends Command {
    static description = 'Transaction command'

    static flags = {
        help: flags.help({ char: 'h' }),
        list: flags.boolean({
            char: 'l',
            description: 'List all transaction with results on them',
        }),
    }

    async run() {
        this.log(`Transaction command... Coming soon`)
    }
}
