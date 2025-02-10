import { currencies } from "../constants/currencies"
import { exchangeRates } from "../constants/exchange-rates"

export type Currency = typeof currencies[number]['id']

export function convertCurrency (amount: string, from: Currency, to: Currency) {
  if(typeof +amount != 'number') return '-'
  
  const rate = exchangeRates[from][to]
  
  return (+amount * rate).toFixed(2) ; 
}