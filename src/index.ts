import { Command, flags } from '@oclif/command'
import { cobiInitialisation } from './utils'

class Cobi extends Command {
    static description = 'describe the command here'

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

        const { args, flags } = this.parse(Cobi)

        this.log(`hello world from ./src/index.ts`)
    }
}

export = Cobi
