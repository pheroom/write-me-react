import React from 'react';
import {IUser} from "../models/IUser";
import TitleUser from "../UI/Texts/TitleUser";
import PUser from "../UI/Texts/PUser";
import Img from "../UI/Img";
import userIcon from '../assets/icons/user-base.png'

const ProfilePreviewLarge = ({user}: { user: IUser }) => {
  return (
    <div className={'profile-preview-large'}>
      <Img className={'profile-preview-large__img'}
           src={user.photoURL || userIcon}
           alt="avatar"/>
      <div className={'profile-preview-large__info'}>
        <TitleUser className={'profile-preview-large__name'}>{user.displayName}</TitleUser>
        <PUser className={'profile-preview-large__email'}>{user.email}</PUser>
      </div>
    </div>
  );
};

export default ProfilePreviewLarge;