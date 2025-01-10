import React from "react";

import CurrencyInput from "react-currency-input-field";

export interface IAmountInput {
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
  error?: string | boolean;
  className?: string;
}

const AmountInput = ({
  name,
  defaultValue,
  placeholder,
  value,
  onChange,
  error,
  className,
  ...props
}: IAmountInput) => {
  return (
    <div className="relative max-w-[320px]">
      {placeholder && (
        <div
          className={`absolute left-[18px] top-1/2 -translate-y-1/2 text-[#00000099] transition-transform duration-200 ease-in leading-[18.23px] tracking-[0.005em] text-left ${
            value
              ? "top-[5px] left-[1px] text-[10px] bg-transparent py-0 px-[15px] z-[1] translate-y-0"
              : "text-[14px]"
          }`}
        >
          {placeholder}
        </div>
      )}
      <div className="flex items-center relative">
        <CurrencyInput
          className={`${className} border-[0.5px] border-[#00000033] rounded-[12px] py-[20px] px-4 text-[14px] w-full min-h-[52px] bg-transparent z-[1] relative font-medium text-[#000000e5] outline-none box-border`}
          name={name}
          value={value}
          defaultValue={defaultValue}
          decimalsLimit={2}
          onValueChange={onChange}
          prefix="NGN"
          autoComplete="off"
          allowNegativeValue={false}
          {...props}
        />
      </div>

      {error && (
        <div className="text-[red] text-[10px] bottom-[-12px] absolute">
          {error}
        </div>
      )}
    </div>
  );
};

export default AmountInput;
