import React, {ButtonHTMLAttributes, FC} from 'react';
import Img from "../Img";

interface ButtonWideModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string
  children: string
  className?: string
  iconSide?: string
  label?: string | null
  alignText?: 'center' | 'left' | 'right'
}

const ButtonWideModal: FC<ButtonWideModalProps> = ({className, alignText, label, iconSide, icon, children, ...args}) => {
  return (
    <button className={"modal__wide-btn " + (className || '')} {...args}>
      <span className="modal__wide-btn-icon-box" style={iconSide ? {width: iconSide, height: iconSide} : {}}>
        {icon && <Img src={icon} alt="members" className="modal__wide-btn-icon"/>}
      </span>
      <span className={"modal__wide-btn-text " + (alignText ? 'modal__wide-btn-text--' + alignText : '')}>
        {children}
      </span>
      <span className="modal__wide-btn-label">
        {label}
      </span>
    </button>
  );
};

export default ButtonWideModal;