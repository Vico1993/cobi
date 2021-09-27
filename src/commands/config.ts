import { Command, flags } from '@oclif/command'
import { cobiInitialisation } from './../utils'

export class Config extends Command {
    static description = 'Manage config with Cobi'

    static flags = {
        help: flags.help({ char: 'h' }),
        add: flags.boolean({ char: 'a', description: 'add new transaction' }),
        get: flags.boolean({
            char: 'g',
            description: 'retrieve all transactions',
        }),
    }

    static args = [{ name: 'file' }]

    async run() {
        // Initialisation of the CLI
        cobiInitialisation()

        const { args, flags } = this.parse(Config)

        this.log(`hello world from ./src/index.ts`)
    }
}
