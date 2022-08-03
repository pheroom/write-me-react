import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../store";
import {IUser} from "../models/IUser";
import {useLoginInput} from "../UI/useLoginInput";
import {changePassword, updateUser} from "../store/UserReducers/UserActionCreators";
import {useEmailInput} from "../UI/useEmailInput";
import {IUserUpdates} from "../models/IUserUpdates";
import Loader from "../UI/Loader";
import {usePasswordInput} from "../UI/usePasswordInput";

const EditProfile = () => {
  const [photo, setPhoto] = useState<undefined | null | File>(undefined)

  const {data, error, isLoading} = useAppSelector(state => state.user)
  const user = data as IUser
  const dispatch = useAppDispatch()

  const {loginInput, login} = useLoginInput(user.displayName)
  const {emailInput, email} = useEmailInput(user.email)
  const {passwordInput, password} = usePasswordInput('')
  const {passwordInput: newPassInput, password: newPass} = usePasswordInput('')

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

  function resetPassword(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    dispatch(changePassword({email: user.email, password: password.value, newPassword: newPass.value}))
  }

  function photoHandle(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      setPhoto(e.target.files[0])
    }
  }

  if(isLoading) return <Loader/>
  return (
    <div>
      {error && <div>{error}</div>}
      <div>
      </div>
      {user.photoURL && <div><img className={'avatar'} src={user.photoURL} alt="avatar"/></div>}
      <br/>
      <form onSubmit={saveChanges}>
        <h2>Редактировать профиль:</h2>
        {loginInput}
        {emailInput}
        <div>
          <input type="file" onChange={photoHandle}/>
        </div>
        <button disabled={!login.inputValid || !email.inputValid} type={'submit'}>Сохранить изменения</button>
      </form>
      <br/>
      <form onSubmit={resetPassword}>
        <h2>Обнавить пароль:</h2>
        <div>last pass: {passwordInput}</div>
        <div>new pass:{newPassInput}</div>
        <button disabled={!password.inputValid || !newPass.inputValid} type={'submit'}>Обнавить пароль</button>
      </form>
    </div>
  );
};

export default EditProfile;