import React from 'react';
import {usePasswordInput} from "../UI/usePasswordInput";
import {useAppDispatch, useAppSelector} from "../store";
import {changePassword, userSignIn} from "../store/UserReducers/UserActionCreators";
import {IUser} from "../models/IUser";

const ChangePassword = () => {
  const {passwordInput, password} = usePasswordInput('')
  const {passwordInput: newPassInput, password: newPass} = usePasswordInput('')

  const {data, error, isLoading} = useAppSelector(state => state.user)
  const user = data as IUser
  const dispatch = useAppDispatch()

  function confirmPassword(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    dispatch(changePassword({email: user.email, password: password.value, newPassword: newPass.value}))
  }

  if(isLoading) return <div>Loading...</div>
  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={confirmPassword}>
        <div>last pass: {passwordInput}</div>
        <div>new pass:{newPassInput}</div>
        <button disabled={!password.inputValid || !newPass.inputValid} type={'submit'}>Обнавить пароль</button>
      </form>
    </div>
  );
};

export default ChangePassword;