import React, {FC, InputHTMLAttributes, useState} from 'react';
import viewActive from "../assets/icons/view-blue.png";
import viewDisabled from "../assets/icons/view-grey.png";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  className?: string
  error?: boolean
}

const PasswordInput: FC<InputProps> = ({className, error, ...args}) => {
  const [visible, setVisible] = useState(true)

  return (
    <div className={'password-input'}>
      {/*<div className={'password-input__inner ' + (error ? ' password-input__inner--error ' : '') + (isFocus ? ' password-input__inner--focus ' : '') + className}>*/}
      {/*  <input*/}
      {/*    type={visible ? 'text' : 'password'}*/}
      {/*    onFocus={onFocusHandle}*/}
      {/*    onBlur={onBlurHandle}*/}
      {/*    className={'password-input__elem '}*/}
      {/*    {...args}*/}
      {/*  />*/}
      {/*</div>*/}
      <input
        type={visible ? 'text' : 'password'}
        className={'password-input__elem ' + (error ? ' password-input__elem--error ' : '') + className}
        {...args}
      />
      <img className={'password-input__view'} src={visible ? viewActive : viewDisabled} onClick={() => setVisible(prev => !prev)} alt={visible ? 'не показывать' : 'показывать'}/>
    </div>
  );
};

export default PasswordInput;