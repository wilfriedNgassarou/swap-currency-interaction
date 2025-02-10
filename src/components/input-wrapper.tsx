import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent, useId, useState } from "react";
import { currencies } from "../constants/currencies";
import { Currency } from "../utils/convertCurrency";
import { ChevronDown } from "./svgs/chevron-down";
import { Check } from "./svgs/check";
import clsx from "clsx";
import NumberFlow from "@number-flow/react";

interface Props {
  selectedCurrencyId: Currency,
  onCurrencyChange: (currencyId: Currency) => void
  inputValue: string,
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

export function InputWrapper({ 
  selectedCurrencyId, 
  onCurrencyChange,
  inputValue,
  onInputChange
}: Props) {
  
  const id = useId()

  const [isOpen, setIsOpen] = useState(false);
  const [showCarret, setShowCarret] = useState(true)

  const selectedCurrency = currencies.find((item) => item.id == selectedCurrencyId)!

  return (
    <div className="flex h-14 rounded-xl px-4 gap-2 items-center bg-gray-100 justify-between">
      <div className="flex-grow h-full relative font-medium">
        <input 
          id={id}
          type="text"
          autoComplete="off"
          value={inputValue}
          onChange={onInputChange}
          className={clsx(
            "peer w-full h-full outline-none bg-transparent text-transparent", 
            showCarret ? 'caret-black' : 'caret-transparent'
          )}
        />
        {/* show the value when user is typing  */}
        <span className="absolute inset-0 text-transparent peer-focus:text-black flex items-center">
          {inputValue.replace('.', ',')}
        </span>
        {/* show animate value when another input is changing   */}
        <label 
          htmlFor={id} 
          className="absolute flex overflow-hidden items-center inset-0 peer-focus:opacity-0"
        >
          <NumberFlow
            format={{ unitDisplay: 'narrow' }}
            onAnimationStart={() => setShowCarret(false)}
            onAnimationsFinish={() => setShowCarret(true)} 
            value={+inputValue} 
          />
        </label>
      </div>
      <div className="relative">
        {/* selected currency  */}
        <div
          onClick={() => setIsOpen(true)} 
          className="h-10 w-32 rounded-full flex gap-2 justify-center items-center bg-white border-[1.5px] border-black/15 cursor-default"
        >
          <img 
            src={selectedCurrency.flag} 
            className="h-4 shadow"
            alt={`${selectedCurrency.id} flag`} 
          />
          <span className="uppercase text-sm font-semibold text-gray-600">
            {selectedCurrency.id}
          </span>
          <motion.span
            className="ml-1"
            animate={{  rotate: isOpen ? 180 : 0 }}
            transition={{ type: 'spring', duration: .5, bounce: .2 }}
          >
            <ChevronDown />
          </motion.span>
        </div>
        {/* currencies list  */}
        <AnimatePresence>
          {isOpen && (
            <>
              <div
                onClick={() => setIsOpen(false)} 
                className="fixed inset-0 cursor-default" 
              />
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ type: 'spring', duration: .6, bounce: .4 }}
                className="absolute z-40 right-0 mt-1 w-44 rounded-lg overflow-hidden bg-white border-[1.5px] border-black/15"
              >
                {currencies.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      onCurrencyChange(item.id)
                      setIsOpen(false)
                    }}
                    className="h-9 flex items-center gap-2 px-2 hover:bg-gray-200 cursor-default"
                  >
                    <img 
                      src={item.flag} 
                      className="h-4 shadow"
                      alt={`${item.id} flag`} 
                    />
                    <span className="uppercase">{item.id}</span>
                    {selectedCurrencyId == item.id && (
                      <span className="ml-6">
                        <Check />
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}