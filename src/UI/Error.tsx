import React, {FC} from 'react';

interface ErrorProps{
  children: string
}

const Error: FC<ErrorProps> = ({children}) => {
  return (
    <div className={'error'}>
      <span className={'error__text'}>{children}</span>
    </div>
  );
};

export default Error;