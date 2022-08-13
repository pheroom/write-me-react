import React from 'react';
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppDispatch, useAppSelector} from "../store";
import {userSignIn} from "../store/UserReducers/UserActionCreators";
import {useLoginInput} from "../UI/useLoginInput";
import {usePasswordInput} from "../UI/usePasswordInput";
import Loader from "../UI/Loader";
import ButtonMedium from "../UI/ButtonMedium";

const SignIn = () => {
  const {loginInput, login} = useLoginInput('')
  const {passwordInput, password} = usePasswordInput('')

  const dispatch = useAppDispatch()
  const {isLoading, error} = useAppSelector(state => state.user)

  function signIn(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    dispatch(userSignIn({login: login.value, password: password.value}))
  }

  if(isLoading) return <Loader/>

  return (
  <main className={'sign-in'}>
    <div className="sign-in__inner">
      <h3 className={'sign-in__title'}>Вход</h3>
      {error && <div>{error}</div>}
      <form onSubmit={signIn} className={'sign-in__form'}>
        {loginInput}
        {passwordInput}
        <ButtonMedium className={'sign-in__button'} disabled={!login.inputValid || !password.inputValid} type={'submit'}>
          Sign In
        </ButtonMedium>
      </form>
      <Link to={RouteNames.SIGNUP}>to sign up</Link>
    </div>
  </main>
  );
};

export default SignIn;