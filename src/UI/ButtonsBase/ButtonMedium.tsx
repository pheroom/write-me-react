import React from 'react';

const ButtonMedium = ({...args}) => {
  return (
    <button {...args} className={'button-medium ' + (args.className ? args.className : '')}>{args.children}</button>
  );
};

export default ButtonMedium;