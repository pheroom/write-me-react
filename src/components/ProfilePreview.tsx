import React, {FC, useEffect, useState} from 'react';
import {IUser} from "../models/IUser";
import {getUserByUid} from "../utils/getUserByUid";
import RegularLoader from "../UI/Loaders/RegularLoader";
import Img from "../UI/Img";
import userIcon from '../assets/icons/user-base.png'

interface ProfilePreviewProps{
  userData: IUser | string
  status?: string
  size?: 'large' | 'medium' | 'small'
}

const ProfilePreview: FC<ProfilePreviewProps> = ({userData, size = 'small', status}) => {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    if (typeof userData === "string") {
      getUserByUid(userData, setUser)
    } else {
      setUser(userData)
    }
  }, [userData])

  const className = `profile-preview-${size}`

  return (
    user
      ? <div className={className}>
        {size === 'small' && status && <p className={className + '__label'}>{status}</p>}
        <Img className={className + '__img'}
             src={user.photoURL || userIcon}
             alt="avatar"/>
        <div className={className + '__info'}>
          <p className={className + '__name'}>{user.displayName}</p>
          <p className={className + '__email'}>{user.email}</p>
        </div>
      </div>
      : <RegularLoader/>
  );
};

export default ProfilePreview;