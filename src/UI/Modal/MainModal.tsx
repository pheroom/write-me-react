import React, {FC, HTMLAttributes} from 'react';

const MainModal: FC<HTMLAttributes<HTMLDivElement>> = ({children, className, ...args}) => {
  return (
    <div className={"modal__main " + (className || '')} {...args}>
      {children}
    </div>
  );
};

export default MainModal