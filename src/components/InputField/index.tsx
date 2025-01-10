import React from "react";

import { IInputField } from "./InputField.types";

const InputField = ({
  name,
  title,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  required,
  disabled,
  autoComplete,
  type,
  minValue,
  maxValue,
  hidePlaceholderAnimation,
  className,
}: IInputField) => {
  return (
    <div className="relative max-w-[320px]">
      {placeholder && !hidePlaceholderAnimation && (
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
        <input
          type={type}
          required={required}
          name={name}
          title={title}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          placeholder={hidePlaceholderAnimation ? placeholder : ""}
          onBlur={onBlur}
          onFocus={onFocus}
          className={`${className} border-[0.5px] border-[#00000033] rounded-[12px] py-[20px] px-4 text-[14px] w-full min-h-[52px] bg-transparent z-[1] relative font-medium text-[#000000e5] outline-none box-border`}
          disabled={disabled}
          min={minValue}
          max={maxValue}
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

export default InputField;
