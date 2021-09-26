/**
 * Basic Coinmarket cap response for /v1/cryptocurrency/quotes/latest
 */
export type cmcAPIResponse = {
    status: {
        timestamp: string
        error_code: number
        error_message: string | null
        credit_count: number
    }
    data: {
        [key: string]: {
            id: number
            name: string
            symbol: string
            slug: string
            num_market_pairs: number
            date_added: string
            max_supply: number
            circulating_supply: number
            total_supply: number
            is_active: boolean
            cmc_rank: number
            is_fiat: boolean
            last_updated: string
            quote: {
                [key: string]: {
                    price: number
                    percent_change_1h: number
                    percent_change_24h: number | null
                    percent_change_7d: number | null
                    percent_change_30d: number | null
                    percent_change_60d: number | null
                    percent_change_90d: number | null
                    last_updated: string
                }
            }
        }
    }
}
