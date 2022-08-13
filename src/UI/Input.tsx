import React from 'react';

const Input = ({...arg}) => {
  return (
    <input className={'input'} {...arg}/>
  );
};

export default Input;