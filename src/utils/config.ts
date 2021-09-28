import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { CONFIG_PATH, CONFIG_FILENAME } from '../constant'

/**
 * @todo Change this to in the HOME of the user ~./cobi
 */
export const init = (): void => {
    if (!existsSync(CONFIG_PATH)) {
        mkdirSync(CONFIG_PATH)

        // init config file with empty JSON for now
        writeFileSync(`${CONFIG_PATH}/${CONFIG_FILENAME}`, JSON.stringify({}))
    }
}
