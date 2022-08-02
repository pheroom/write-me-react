import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../store";
import {IUser} from "../models/IUser";
import {useLoginInput} from "../UI/useLoginInput";
import {updateUser} from "../store/UserReducers/UserActionCreators";
import {useEmailInput} from "../UI/useEmailInput";
import {IUserUpdates} from "../models/IUserUpdates";
import {RouteNames} from "../router";
import {Link} from "react-router-dom";

const CurrentUserProfile = () => {
  let {data, isLoading, error} = useAppSelector(state => state.user)
  let user = data as IUser

  const dispatch = useAppDispatch()

  const [photo, setPhoto] = useState<undefined | null | File>(undefined)

  const {loginInput, login} = useLoginInput(user.displayName)
  const {emailInput, email} = useEmailInput(user.email)

  async function saveChanges(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const updates: IUserUpdates = {}
    if(login.value !== user.displayName){
      updates.displayName = login.value
    }
    if(email.value !== user.email){
      updates.email = email.value
    }
    if(photo){
      updates.photo = photo
    }
    dispatch(updateUser(updates))
  }

  function photoHandle(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      setPhoto(e.target.files[0])
    }
  }

  if(isLoading) return <div>Loading...</div>
  return (
    <div>
      {error && <div>{error}</div>}
      <div>
        <Link to={RouteNames.CHANGE_PASSWORD}>Обнавить пароль</Link>
      </div>
      {user.photoURL && <div><img className={'avatar'} src={user.photoURL} alt="avatar"/></div>}
      <form onSubmit={saveChanges}>
        {loginInput}
        {emailInput}
        <div>
          <input type="file" onChange={photoHandle}/>
        </div>
        <button disabled={!login.inputValid || !email.inputValid} type={'submit'}>Save changes</button>
      </form>
    </div>
  );
};

export default CurrentUserProfile;