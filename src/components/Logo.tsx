import React from 'react';
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className={'logo'}>
      <img className={'logo__img'} src={logo} alt="logo"/>
      <h2>WriteMe</h2>
    </div>
  );
};

export default Logo;