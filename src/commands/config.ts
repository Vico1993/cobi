import { Command, flags } from '@oclif/command'
import { init } from '../utils/config'

export class Config extends Command {
    static description = 'Manage config with Cobi'

    static flags = {
        help: flags.help({ char: 'h' }),
        currency: flags.string({
            char: 'c',
            description: "Set your currency, by default it's CAD",
        }),
    }

    static args = [{ name: 'file' }]

    async run() {
        // Initialisation of config
        init()

        // const { args, flags } = this.parse(Config)

        const { currency } = this.parse(Config).flags

        console.log(currency)

        this.log(`hello world from ./src/index.ts`)
    }
}
