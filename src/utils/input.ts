import { createInterface } from 'readline'

let readline = createInterface({
    input: process.stdin,
    output: process.stdout,
})

/**
 * Will ask user a question and return a response as a async
 *
 * @param {string} q
 * @returns {Promise<string>}
 */
export const question = async (q: string): Promise<string> => {
    readline.setPrompt(q)
    readline.prompt()

    let response = ''
    return new Promise((resolve, reject) => {
        readline.on('line', (userInput) => {
            response = userInput
            readline.close()
        })

        readline.on('close', () => {
            resolve(response)
        })
    })
}
