import React, {ButtonHTMLAttributes, FC} from 'react';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, className, ...args}) => {
  return (
    <button className={'button ' + (className || '')} {...args}>
      {children}
    </button>
  );
};

export default Button;