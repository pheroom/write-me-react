import React from 'react';
import {IUser} from "../models/IUser";

const ProfilePreviewLarge = ({user}: { user: IUser }) => {
  return (
    <div className={'profile-preview-large'}>
      <img className={'profile-preview-large__img'}
           src={user.photoURL || 'https://cdn.ananasposter.ru/image/cache/catalog/poster/mult/95/2266-1000x830.jpg'}
           alt="avatar"/>
      <div className={'profile-preview-large__info'}>
        <div className={'profile-preview-large__name'}>{user.displayName}</div>
        <div className={'profile-preview-large__email'}>{user.email}</div>
      </div>
    </div>
  );
};

export default ProfilePreviewLarge;