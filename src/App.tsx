import { useState } from "react"
import { InputWrapper } from "./components/input-wrapper"
import { convertCurrency, Currency } from "./utils/convertCurrency"
import { Credits } from "./components/credits"

function App() {
  const [amount1CurrencyId, setAmount1CurrencyId] = useState<Currency>('eur')
  const [amount2CurrencyId, setAmount2CurrencyId] = useState<Currency>('usd')

  const [amount1, setAmount1] = useState('14');
  const [amount2, setAmount2] = useState(convertCurrency(amount1, 'eur', 'usd'));
  
  return (
    <section className="w-full h-dvh flex justify-center items-center">
      <Credits />
      <div className="w-80 p-3 border-[1.5px] border-black/30 rounded-3xl">
        <h2 className="font-medium text-lg text-gray-400">Swap Currency</h2>
        <div className="flex flex-col gap-1 mt-4">
          <InputWrapper
            inputValue={amount1}
            onInputChange={(e) => {
              if(isNaN(+e.target.value)) return

              setAmount1(e.target.value);
              setAmount2(convertCurrency(e.target.value, amount1CurrencyId, amount2CurrencyId))
            }}
            selectedCurrencyId={amount1CurrencyId}
            onCurrencyChange={(currency) => {
              setAmount1CurrencyId(currency)
              setAmount1(convertCurrency(amount2, amount2CurrencyId, currency))
            }}
          />
          <InputWrapper
            inputValue={amount2}
            onInputChange={(e) => {
              if(isNaN(+e.target.value)) return
              
              setAmount2(e.target.value);
              setAmount1(convertCurrency(e.target.value, amount2CurrencyId, amount1CurrencyId))
            }}
            selectedCurrencyId={amount2CurrencyId}
            onCurrencyChange={(currency) => {
              setAmount2CurrencyId(currency)
              setAmount2(convertCurrency(amount1, amount1CurrencyId, currency))
            }}
          />
        </div>
        <button className="w-full h-14 rounded-2xl mt-4 flex justify-center items-center bg-black">
          <span className="font-semibold text-white text-lg">
            Proceed
          </span>
        </button>
        <div className="mt-4 font-medium flex gap-1 justify-center text-sm text-gray-500">
          <span className="uppercase">1 {amount1CurrencyId}</span>
          <span>≈</span>
          <span className="uppercase">
            {convertCurrency('1', amount1CurrencyId, amount2CurrencyId)} {amount2CurrencyId}
          </span>
        </div>
      </div>
    </section>
  )
}

export default App
