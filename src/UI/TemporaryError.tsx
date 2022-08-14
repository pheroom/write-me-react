import React from 'react';

const TemporaryError = ({...args}) => {
  return (
    <div {...args} className={'temporary-error ' + (args.className ? args.className : '')}>
      {args.children}
    </div>
  );
};

export default TemporaryError;