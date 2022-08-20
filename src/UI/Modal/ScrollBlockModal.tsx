import React, {FC} from 'react';

interface ScrollBlockModalProps{
  children: React.ReactNode
  maxHeight?: string
}

const ScrollBlockModal: FC<ScrollBlockModalProps> = ({children, maxHeight}) => {
  return (
    <div className={'modal__scroll-block'} style={maxHeight ? {maxHeight: maxHeight} : {}}>
      {children}
    </div>
  );
};

export default ScrollBlockModal;