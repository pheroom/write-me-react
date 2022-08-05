import React, {FC} from 'react';

interface ErrorProps{
  message: string
}

const Error: FC<ErrorProps> = ({message}) => {
  return (
    <div>
      {message}
    </div>
  );
};

export default Error;