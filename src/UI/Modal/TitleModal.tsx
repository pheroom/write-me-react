import React, {FC, HTMLAttributes} from 'react';

interface TitleModalProps extends HTMLAttributes<HTMLHeadingElement>{
  children: string
  smallIndent?: boolean
  className?: string
  unindent?: boolean
}

const TitleModal: FC<TitleModalProps> = ({children, unindent, smallIndent, className, ...args}) => {
  return (
    <h3 className={
      "modal__title " +
      (smallIndent ? 'modal__title--small-indent ' : '') +
      (unindent ? 'modal__title--unindent ' : ' ') +
      (className || '')
    } {...args}>{children}</h3>
  );
};

export default TitleModal;