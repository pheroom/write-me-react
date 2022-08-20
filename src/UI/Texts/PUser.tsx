import React, {FC, HTMLAttributes} from 'react';


const PUser: FC<HTMLAttributes<HTMLParagraphElement>> = ({children, className, ...args}) => {
  return (
    <p className={'user-paragraph ' + (className || '')} {...args}>{children}</p>
  );
};

export default PUser;