import React, {FC, InputHTMLAttributes} from 'react';
import disIcon from '../../assets/icons/checkbox-disabled.png'
import actIcon from '../../assets/icons/checkbox-active.png'
import Img from "../Img";

const Checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = ({className, ...args}) => {

  return (
    <label className={'checkbox ' + (className || '')}>
      <Img src={args.checked ? actIcon : disIcon}/>
      <input
        type="checkbox"
        className={"checkbox__input"}
        {...args}
      />
    </label>
  );
};

export default Checkbox;