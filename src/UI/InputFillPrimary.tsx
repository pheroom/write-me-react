import React, {FC, InputHTMLAttributes, useState} from 'react';
import crossDisIcon from "../assets/icons/cross-disabled.png";
import crossActIcon from "../assets/icons/cross-active.png";

interface InputFillPrimaryProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameBox?: string
  value: string
  resetValue: () => void
}

const InputFillPrimary: FC<InputFillPrimaryProps> = ({className, classNameBox, value, resetValue, ...args}) => {

  return (
    <div className={'input-fill-primary ' + (classNameBox ? classNameBox : '')}>
      <input
        type="text"
        className={'input-fill-primary__elem ' + (className ? className : '')}
        value={value}
        {...args}
      />
      <div className={"input-fill-primary__img-box " + (value ? '' : 'input-fill-primary__img-box--disabled')} onClick={resetValue}>
        <img className={'input-fill-primary__img--disabled'} src={crossDisIcon} alt="clear"/>
        <img className={'input-fill-primary__img--active'} src={crossActIcon} alt="clear"/>
      </div>
    </div>
  );
};

export default InputFillPrimary;