import React, {FC, HTMLAttributes} from 'react';

const HoverRowModal: FC<HTMLAttributes<HTMLDivElement>> = ({children, className, ...args}) => {
  return (
    <div className={'modal__hover-row ' + (className || '')} {...args}>
      {children}
    </div>
  );
};

export default HoverRowModal;