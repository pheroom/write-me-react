import React from 'react';
import s from '../styles/Navbar.module.css'
import Logo from "./Logo";
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppDispatch, useAppSelector} from "../store";
import {signOut} from "../store/UserReducers/UserActionCreators";
import {useSelectorUser} from "../hooks/redux";

const Navbar = () => {
  const {userData} = useSelectorUser()
  const dispatch = useAppDispatch()

  function logout(){
    dispatch(signOut())
  }

  return (
    userData
      ? <header className={s.navbar}>
        <div className="container">
          <div className={s.inner}>
            <Link to={RouteNames.FEED}><Logo/></Link>
            <Link to={RouteNames.EDIT_PROFILE}>Редактировать профиль</Link>
            <h3>{userData.displayName}</h3>
            <button onClick={logout}>logout</button>
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