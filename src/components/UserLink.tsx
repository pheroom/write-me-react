import React, {FC, useEffect, useState} from 'react';
import {IUser} from "../models/IUser";
import UsersService from "../firebaseAPI/UsersService";
import {Link} from "react-router-dom";
import {RouteNames} from "../router";

interface UserLinkProps{
  uid: string
}

const UserLink: FC<UserLinkProps> = ({uid}) => {
  const [user, setUser] = useState<null | IUser>(null)

  useEffect(()=>{
    UsersService.getUser(uid).then(user => setUser(user))
  }, [uid])

  return (
    <>
      {user
        ? <Link to={RouteNames.USER + '/' + uid}>{user.displayName}</Link>
        : <div>Unnamed</div>
      }
    </>
  );
};

export default UserLink;