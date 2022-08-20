import React, {useContext} from 'react';
import Logo from "./Logo";
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppDispatch} from "../store";
import {signOut} from "../store/UserReducers/UserActionCreators";
import {useSelectorUser} from "../hooks/redux";
import ButtonLineRegular from "../UI/ButtonsBase/ButtonLineRegular";
import ProfilePreviewLarge from "./ProfilePreviewLarge";

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
              <ProfilePreviewLarge user={userData}/>
              {/*<Link to={RouteNames.EDIT_PROFILE}>Редактировать профиль</Link>*/}
              {/*<h3>{userData.displayName}</h3>*/}
              <ButtonLineRegular onClick={logout}>Выйти</ButtonLineRegular>
            </div>
            : <Logo/>
        }
      </div>
    </header>
  );
};

export default Navbar;