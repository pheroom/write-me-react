import React, {FC, InputHTMLAttributes, useState} from 'react';
import InputUnderlined from "./InputUnderlined";

interface InputLabeledProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string
  value?: string
  boxClassName?: string
  error?: boolean
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  autofocus?: boolean
}

const InputLabeled: FC<InputLabeledProps> = ({label, error, autofocus, onFocus, onBlur, value, boxClassName, className,  ...args}) => {
  const [isFocus, setIsFocus] = useState(!!autofocus)

  function onFocusHandle(e: React.FocusEvent<HTMLInputElement>){
    setIsFocus(true)
    onFocus && onFocus(e)
  }

  function onBlurHandle(e: React.FocusEvent<HTMLInputElement>){
    setIsFocus(false)
    onBlur && onBlur(e)
  }

  return (
    <div className={"input-labeled " + (boxClassName || '')}>
      <p className={'input-labeled__label ' + (isFocus ? 'input-labeled__label--focus ' : '') + (error ? 'input-labeled__label--error ' : '')}>{label}</p>
      <InputUnderlined
        error={error}
        placeholder={label}
        className={'input-labeled__input ' + (className || '')}
        onFocus={onFocusHandle}
        onBlur={onBlurHandle}
        {...args}
      />
    </div>
  );
};

export default InputLabeled;