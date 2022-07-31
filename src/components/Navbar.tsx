import React from 'react';
import s from '../styles/Navbar.module.css'
import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className={s.navbar}>
      <div className="container">
        <Logo/>
      </div>
    </header>
  );
};

export default Navbar;