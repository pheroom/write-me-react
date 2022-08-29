import React from 'react';
import {IUser} from "../models/IUser";
import userIcon from '../assets/icons/user-base.png'

const ProfilePreviewMedium = ({user}: { user: IUser }) => {
  return (
    <div className={'profile-preview-medium'}>
      <img className={'profile-preview-medium__img'}
           src={user.photoURL || userIcon}
           alt="avatar"/>
      <div className={'profile-preview-medium__info'}>
        <div className={'profile-preview-medium__name'}>{user.displayName}</div>
        <div className={'profile-preview-medium__email'}>{user.email}</div>
      </div>
    </div>
  );
};

export default ProfilePreviewMedium;