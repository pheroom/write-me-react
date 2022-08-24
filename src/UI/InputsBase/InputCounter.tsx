import React, {FC, InputHTMLAttributes} from 'react';

interface InputCounterProps extends InputHTMLAttributes<HTMLInputElement>{
  maxCount: number
  boxClassName?: string
  value: string
}

const InputCounter: FC<InputCounterProps> = ({className, boxClassName, value, maxCount, ...args}) => {
  const count = maxCount - value.length

  return (
    <div className={'input-counter ' + (boxClassName || '')}>
      <input
        type="text"
        className={'input-counter__elem ' + (className || '')}
        value={value}
        {...args}
      />
      <p className={'input-counter__count ' + (count < 0 ? 'input-counter__count--error' : '')}>{count}</p>
    </div>
  );
};

export default InputCounter