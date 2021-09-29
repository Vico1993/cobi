// Possible type with Crypto.com
// This list may increase over time
export type transacKind =
    | 'crypto_withdrawal'
    | 'crypto_exchange'
    | 'viban_purchase'
    | 'crypto_purchase'
    | 'dust_conversion_credited'
    | 'dust_conversion_debited'
    | 'crypto_earn_program_withdrawn'
    | 'crypto_earn_interest_paid'
    | 'crypto_earn_program_withdrawn'
    | 'crypto_earn_program_created'

// CSV Input
export type input = {
    'Timestamp (UTC)': string
    'Transaction Description': string
    Currency: string
    Amount: number
    'To Currency': string
    'To Amount': string
    'Native Currency': string
    'Native Amount': string
    'Native Amount (in USD)': string
    'Transaction Kind': transacKind
}
