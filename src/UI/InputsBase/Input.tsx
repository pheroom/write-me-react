import React, {FC, InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  className?: string
}

const Input: FC<InputProps> = ({className, ...args}) => {
  return (
    <input
      type="text"
      className={'input ' + (className || '')}
      {...args}
    />
  );
};

export default Input;