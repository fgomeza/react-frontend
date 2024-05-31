import React, { useEffect, useState } from "react";

import { isNumeric, onlyNumbers, strToFloat } from "../../utils/Utils";
import { isFunction } from "lodash";

type Props = {
  value?: string | number
  onChangeOrBlur?: (value: string) => void
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  selectOnFocus?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "onBlur">;

export default function NumberInput({
  value,
  selectOnFocus = true,
  onChangeOrBlur,
  onChange,
  onBlur,
  ...props
}: Props) {
  // Value needs to be kept as string to account for separators
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const newValue = value?.toString() ?? ''
    if (isNumeric(newValue)) {
      setInputValue(newValue)
    }
  }, [value])

  useEffect(() => {
    const newValue = value?.toString() ?? ''
    changeValue(strToFloat(newValue))
  }, [])

  function changeValue(value: string) {
    setInputValue(value)
    if (isFunction(onChangeOrBlur)) {
      if (isNumeric(value)) {
        onChangeOrBlur(value);
      }
    }
  }

  function onInputChange(value: string) {
    const maskedValue = onlyNumbers(value);

    changeValue(maskedValue);
    if (isFunction(onChange)) {
      if (isNumeric(maskedValue)) {
        onChange(maskedValue);
      }
    }
  }

  function onInputBlur(value: string) {
    const maskedValue = strToFloat(value);

    setInputValue(maskedValue)
    if (isFunction(onBlur)) {
      if (isNumeric(maskedValue)) {
        onBlur(maskedValue);
      }
    }
  }

  function onInputFocus(ev: React.FocusEvent<HTMLInputElement, Element>) {
    if (selectOnFocus) {
      ev.target.select();
    }
  }

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => onInputChange(e.target.value)}
      onBlur={(e) => onInputBlur(e.target.value)}
      onFocus={onInputFocus}
      {...props}
    />
  );
}
