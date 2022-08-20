import React, {ButtonHTMLAttributes, FC} from 'react';

interface ButtonWideModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  text: string
  className?: string
}

const ButtonWideModal: FC<ButtonWideModalProps> = ({className, icon, text, ...args}) => {
  return (
    <button className={"modal__wide-btn " + (className ? className : '')} {...args}>
      <span className="modal__wide-btn-icon-box">
        <img src={icon} alt="members" className="modal__wide-btn-icon"/>
      </span>
      <span className="modal__wide-btn-text">
        {text}
      </span>
    </button>
  );
};

export default ButtonWideModal;