import React, {FC, InputHTMLAttributes} from 'react';
import InputUnderlined from "./InputUnderlined";

interface InputLabeledProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string
  value?: string
  boxClassName?: string
  error?: boolean
}

const InputLabeled: FC<InputLabeledProps> = ({label, error, value, boxClassName, className,  ...args}) => {
  return (
    <div className={"input-labeled " + (boxClassName || '')}>
      <p className={'input-labeled__label ' + (error ? 'input-labeled__label--error' : '')}>{label}</p>
      <InputUnderlined
        error={error}
        placeholder={label}
        className={'input-labeled__input ' + (className || '')}
        {...args}
      />
    </div>
  );
};

export default InputLabeled;