import React, {FC, HTMLAttributes} from 'react';

interface TitleModalProps extends HTMLAttributes<HTMLHeadingElement>{
  children: string
  smallIndent?: boolean
  className?: string
}

const TitleModal: FC<TitleModalProps> = ({children, smallIndent, className, ...args}) => {
  return (
    <h3 className={"modal__title " + (smallIndent && 'modal__title--small-indent ' + (className || ''))} {...args}>{children}</h3>
  );
};

export default TitleModal;