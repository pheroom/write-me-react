import React from 'react';
import Logo from "./Logo";
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppDispatch} from "../store";
import {signOut} from "../store/UserReducers/UserActionCreators";
import {useSelectorUser} from "../hooks/redux";

const Navbar = () => {
  const {userData} = useSelectorUser()
  const dispatch = useAppDispatch()

  function logout() {
    dispatch(signOut())
  }

  return (
    <header className={'navbar'}>
      <div className="container">
        {
          userData
            ? <div className={'navbar__inner'}>
              <Link to={RouteNames.FEED}><Logo/></Link>
              <Link to={RouteNames.EDIT_PROFILE}>Редактировать профиль</Link>
              <h3>{userData.displayName}</h3>
              <button onClick={logout}>logout</button>
            </div>
            : <Logo/>
        }
      </div>
    </header>
  );
};

export default Navbar;