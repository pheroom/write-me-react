import React from 'react';
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppDispatch, useAppSelector} from "../store";
import {userSignUp} from "../store/UserReducers/UserActionCreators";
import {useLoginInput} from "../UI/useLoginInput";
import {usePasswordInput} from "../UI/usePasswordInput";
import {useEmailInput} from "../UI/useEmailInput";
import Loader from "../UI/Loader";
import ButtonMedium from "../UI/ButtonMedium";

const SignUp = () => {
  const {loginInput, login} = useLoginInput('')
  const {emailInput, email} = useEmailInput('')
  const {passwordInput, password} = usePasswordInput('')

  const dispatch = useAppDispatch()
  const {isLoading, error} = useAppSelector(state => state.user)

  function signUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(userSignUp({login: login.value, email: email.value, password: password.value}))
  }

  if (isLoading) return <Loader/>

  return (
    <main className={'sign-up'}>
      <div className="sign-up__inner">
        <h3 className={'sign-up__title'}>Регистрация</h3>
        {error && <div>{error}</div>}
        <form onSubmit={signUp} className={'sign-up__form'}>
          {loginInput}
          {emailInput}
          {passwordInput}
          <ButtonMedium className={'sign-up__button'} disabled={!login.inputValid || !email.inputValid || !password.inputValid} type={'submit'}>
            Sign Un
          </ButtonMedium>
        </form>
        <Link to={RouteNames.SIGNIN}>to sign in</Link>
      </div>
    </main>
  );
};

export default SignUp;

