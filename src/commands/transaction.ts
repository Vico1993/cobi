import { Command, flags } from '@oclif/command'

export class Transaction extends Command {
    static description = 'Transaction command'

    static flags = {
        help: flags.help({ char: 'h' }),
    }

    async run() {
        this.log(`hello world transaction command... Coming soon`)
    }
}
