import React from 'react';
import s from "../styles/Logo.module.css";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className={s.logo}>
      <img className={s.img} src={logo} alt="logo"/>
      <h2>WriteMe</h2>
    </div>
  );
};

export default Logo;