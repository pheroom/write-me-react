import React, {FC, HTMLAttributes} from 'react';
import Img from "../Img";
import crossIcon from '../../assets/icons/cross-active.png'

interface ErrorProps extends HTMLAttributes<HTMLDivElement>{
  children: string
  close?: () => void
}

const Error: FC<ErrorProps> = ({children, close, className, ...args}) => {
  return (
    <div className={'error ' + (className || '')} {...args}>
      {children}
      {close && <Img src={crossIcon} className={'error__close'} onClick={close}/>}
    </div>
  );
};

export default Error;