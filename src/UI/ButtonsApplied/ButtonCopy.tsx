import React, {ButtonHTMLAttributes, FC} from 'react';

interface ButtonCopyProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  copyText: string
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

const ButtonCopy: FC<ButtonCopyProps> = ({children, copyText, className, onClick, ...args}) => {

  function copyInviteLink(e: React.MouseEvent) {
    if(onClick){
      onClick(e)
    }
    navigator.clipboard.writeText(copyText)
    alert('copy')
  }

  return (
    <button className={"btn-copy " + (className || '')} onClick={copyInviteLink} {...args}>{children}</button>
  );
};

export default ButtonCopy;