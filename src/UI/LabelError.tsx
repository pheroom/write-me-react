import React from 'react';
import rejectedIcon from '../assets/icons/rejected.png'

const LabelError = ({...args}) => {
  return (
    <div {...args} className={'label-error ' + (args.className ? args.className : '')}>
      {args.children}
    </div>
  );
};

export default LabelError;