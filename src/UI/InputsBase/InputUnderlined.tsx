import React, {FC, InputHTMLAttributes} from 'react';

interface InputUnderlinedProps extends InputHTMLAttributes<HTMLInputElement>{
  className?: string
  error?: boolean
}

const InputUnderlined: FC<InputUnderlinedProps> = ({className, error, ...args}) => {
  return (
    <input
      type="text"
      className={'input-underlined ' + (error ? ' input-underlined--error ' : '') + (className || '')}
      {...args}
    />
  );
};

export default InputUnderlined;