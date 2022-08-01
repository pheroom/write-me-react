import React from 'react';
import s from '../styles/Navbar.module.css'
import Logo from "./Logo";
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppSelector} from "../store";

const Navbar = () => {
  const {data} = useAppSelector(state => state.user)

  return (
    data
      ? <header className={s.navbar}>
        <div className="container">
          <div className={s.inner}>
            <Link to={RouteNames.CHAT}><Logo/></Link>
            <Link to={RouteNames.PROFILE}>to profile</Link>
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