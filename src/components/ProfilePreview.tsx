import React, {FC, useEffect, useState} from 'react';
import {IUser} from "../models/IUser";
import {getUserByUid} from "../utils/getUserByUid";
import RegularLoader from "../UI/Loaders/RegularLoader";
import Img from "../UI/Img";
import userIcon from '../assets/icons/user-base.png'
import PUser from "../UI/Texts/PUser";

interface ProfilePreviewProps{
  onClick?: (e: React.MouseEvent) => void
  userData: IUser | string
  status?: string
  size?: 'large' | 'medium' | 'small'
}

const ProfilePreview: FC<ProfilePreviewProps> = ({userData, onClick, size = 'small', status}) => {
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
             photoData={user.photoURL}
             alt="avatar"
             onClick={onClick}/>
        <div className={className + '__info'}>
          <PUser className={className + '__name'} onClick={onClick}>{user.displayName}</PUser>
          <PUser className={className + '__email'} onClick={onClick}>{user.email}</PUser>
        </div>
      </div>
      : <RegularLoader fullWidth/>
  );
}

export default ProfilePreview;