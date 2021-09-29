import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { CONFIG_PATH } from '../../constant'
import { jsonTransaction } from '.'

/**
 * @param {string}
 */
const TRANSACTION_FINENAME = 'transactions.json'

export class model {
    /**
     * @param {jsonTransaction} data
     */
    saveToJson = (data: jsonTransaction) => {
        // check if cobi config folder exists
        if (!existsSync(CONFIG_PATH)) {
            mkdirSync(CONFIG_PATH)
        }

        // For now override informations...
        // Need to find a better solutions
        writeFileSync(
            `${CONFIG_PATH}/${TRANSACTION_FINENAME}`,
            JSON.stringify(data),
        )
    }
}
