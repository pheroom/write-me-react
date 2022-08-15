import React from 'react';
import {IUser} from "../models/IUser";
import {Link} from "react-router-dom";
import {RouteNames} from "../router";

const ProfilePane = ({user}: {user: IUser}) => {
  return (
    <Link to={RouteNames.EDIT_PROFILE} className={'profile-pane'}>
      <div className={'profile-pane__info'}>
        <div className={'profile-pane__name'}>{user.displayName}</div>
        <div className={'profile-pane__email'}>{user.email}</div>
      </div>
      <img className={'profile-pane__img'} src={user.photoURL || 'https://cdn.ananasposter.ru/image/cache/catalog/poster/mult/95/2266-1000x830.jpg'} alt="avatar"/>
    </Link>
  );
};

export default ProfilePane;