import React, {FC,HTMLAttributes} from 'react';

interface FooterButtonsModalProps extends HTMLAttributes<HTMLDivElement>{
  topIndent?: boolean
}

const FooterButtonsModal: FC<FooterButtonsModalProps> = ({children, topIndent, className, ...args}) => {
  return (
    <div className={'modal__footer-buttons ' + (topIndent ? 'modal__footer-buttons--top-indent ' : '') + (className || '')} {...args}>
      {children}
    </div>
  );
};

export default FooterButtonsModal