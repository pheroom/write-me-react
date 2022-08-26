import React, {ButtonHTMLAttributes, FC} from 'react';

interface ButtonWideModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  children: string
  className?: string
  sideIcon?: string
  label?: string | null
}

const ButtonWideModal: FC<ButtonWideModalProps> = ({className, label, sideIcon, icon, children, ...args}) => {
  return (
    <button className={"modal__wide-btn " + (className || '')} {...args}>
      <span className="modal__wide-btn-icon-box" style={sideIcon ? {width: sideIcon, height: sideIcon} : {}}>
        <img src={icon} alt="members" className="modal__wide-btn-icon"/>
      </span>
      <span className="modal__wide-btn-text">
        {children}
      </span>
      <span className="modal__wide-btn-label">
        {label}
      </span>
    </button>
  );
};

export default ButtonWideModal;