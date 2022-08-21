import React, {FC, HTMLAttributes} from 'react';

const BlockIndentModal: FC<HTMLAttributes<HTMLDivElement>> = ({children, className, ...args}) => {
  return (
    <div className={'modal__block-indent ' + (className || '')} {...args}>
      {children}
    </div>
  );
};

export default BlockIndentModal;