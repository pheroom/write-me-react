import React from 'react';
import {IUser} from "../models/IUser";

const ProfilePreviewMedium = ({user}: { user: IUser }) => {
  return (
    <div className={'profile-preview-medium'}>
      <img className={'profile-preview-medium__img'}
           src={user.photoURL || 'https://cdn.ananasposter.ru/image/cache/catalog/poster/mult/95/2266-1000x830.jpg'}
           alt="avatar"/>
      <div className={'profile-preview-medium__info'}>
        <div className={'profile-preview-medium__name'}>{user.displayName}</div>
        <div className={'profile-preview-medium__email'}>{user.email}</div>
      </div>
    </div>
  );
};

export default ProfilePreviewMedium;