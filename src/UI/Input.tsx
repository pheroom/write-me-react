import React, {FC, InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  className?: string
  error?: boolean
}

const Input: FC<InputProps> = ({className, error, ...args}) => {
  return (
    <input
      type="text"
      className={'input ' + (error ? ' input--error ' : '') + (className ? className : '')}
      {...args}
    />
  );
};

export default Input;