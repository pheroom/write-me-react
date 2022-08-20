import React from 'react';

const ButtonLineRegular = ({...args}) => {
  return (
    <button {...args} className={'button-line-regular ' + (args.className ? args.className : '')}>{args.children}</button>
  );
};

export default ButtonLineRegular;