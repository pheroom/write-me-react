import React, {useEffect, useState} from 'react';
import {IUser} from "../models/IUser";
import {getUserByUid} from "../utils/getUserByUid";
import RegularLoader from "../UI/RegularLoader";
import Img from "../UI/Img";

const ProfilePreviewSmall = ({userData, status}: { userData: IUser | string, status?: string}) => {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    if (typeof userData === "string") {
      getUserByUid(userData, setUser)
    } else {
      setUser(userData)
    }
  }, [userData])

  return (
    user
      ? <div className={'profile-preview-small'}>
        {status && <p className={'profile-preview-small__admin-label'}>{status}</p>}
        <Img className={'profile-preview-small__img'}
             src={user.photoURL || 'https://cdn.ananasposter.ru/image/cache/catalog/poster/mult/95/2266-1000x830.jpg'}
             alt="avatar"/>
        <div className={'profile-preview-small__info'}>
          <p className={'profile-preview-small__name'}>{user.displayName}</p>
          <p className={'profile-preview-small__email'}>{user.email}</p>
        </div>
      </div>
      : <RegularLoader/>
  );
};

export default ProfilePreviewSmall;