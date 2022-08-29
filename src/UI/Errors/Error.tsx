import React, {FC, HTMLAttributes} from 'react';

interface ErrorProps extends HTMLAttributes<HTMLDivElement>{
  children: string
}

const Error: FC<ErrorProps> = ({children, className, ...args}) => {
  return (
    <div className={'error ' + (className || '')} {...args}>
      {children}
    </div>
  );
};

export default Error;