import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IUser} from "../models/IUser";
import UsersService from "../firebaseAPI/UsersService";
import Loader from "../UI/Loader";

const UserPage = () => {
  const [user, setUser] = useState<null | IUser>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {uid} = useParams()

  useEffect(()=>{
    setIsLoading(true)
    if(uid){
      UsersService.getUser(uid).then(user => {
        setUser(user)
        setIsLoading(false)
      })
    }
  }, [uid])


  if(isLoading) return <Loader/>
  return (
    <div>
      {user?.photoURL ? <div><img className={'avatar'} src={user.photoURL} alt="avatar"/></div> : <div>Фото не установлено</div>}
      <br/>
      {user?.displayName}
    </div>
  );
};

export default UserPage;