import React, {FC, HTMLAttributes} from 'react';

const TitleUser: FC<HTMLAttributes<HTMLHeadingElement>> = ({children, className, ...args}) => {
  return (
    <h3 className={'user-h3 ' + (className || '')} {...args}>{children}</h3>
  );
};

export default TitleUser;