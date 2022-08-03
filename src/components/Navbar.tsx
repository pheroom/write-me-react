import React from 'react';
import s from '../styles/Navbar.module.css'
import Logo from "./Logo";
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppSelector} from "../store";

const Navbar = () => {
  const {data: user} = useAppSelector(state => state.user)

  return (
    user
      ? <header className={s.navbar}>
        <div className="container">
          <div className={s.inner}>
            <Link to={RouteNames.CHAT}><Logo/></Link>
            <Link to={RouteNames.EDIT_PROFILE}>Редактировать профиль</Link>
            <h3>{user.displayName}</h3>
          </div>
        </div>
      </header>
      : <header className={s.navbar}>
        <div className="container">
          <Logo/>
        </div>
      </header>
  );
};

export default Navbar;