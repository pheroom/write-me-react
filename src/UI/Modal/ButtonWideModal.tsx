import React, {ButtonHTMLAttributes, FC} from 'react';

interface ButtonWideModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  children: string
  className?: string
}

const ButtonWideModal: FC<ButtonWideModalProps> = ({className, icon, children, ...args}) => {
  return (
    <button className={"modal__wide-btn " + (className ? className : '')} {...args}>
      <span className="modal__wide-btn-icon-box">
        <img src={icon} alt="members" className="modal__wide-btn-icon"/>
      </span>
      <span className="modal__wide-btn-text">
        {children}
      </span>
    </button>
  );
};

export default ButtonWideModal;