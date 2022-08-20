import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppDispatch, useAppSelector} from "../store";
import {userSignIn} from "../store/UserReducers/UserActionCreators";
import {useLoginInput} from "../UI/useLoginInput";
import {usePasswordInput} from "../UI/usePasswordInput";
import Loader from "../UI/Loader";
import ButtonMedium from "../UI/ButtonsBase/ButtonMedium";
import {userSlice} from "../store/UserReducers/UserSlice";
import Error from "../UI/Error";

const SignIn = () => {
  const {loginInput, login} = useLoginInput('', 'sign-in__input', 'sign-in__input-box')
  const {passwordInput, password} = usePasswordInput('', 'sign-in__input', 'sign-in__input-box')

  const dispatch = useAppDispatch()
  const {resetError} = userSlice.actions
  const {isLoading, error} = useAppSelector(state => state.user)

  useEffect(()=>{
    return () => {
      dispatch(resetError())
    }
  }, [])

  function signIn(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    dispatch(userSignIn({login: login.value, password: password.value}))
  }

  return (
  <main className={'sign-in'}>
    {isLoading && <Loader/>}
    <div className="sign-in__inner">
      <h3 className={'sign-in__title'}>Вход</h3>
      {error && <div className={'sign-in__error'}>
        <Error message={error}/>
      </div>}
      <form onSubmit={signIn} className={'sign-in__form'}>
        {loginInput}
        {passwordInput}
        <ButtonMedium className={'sign-in__button'} disabled={!login.inputValid || !password.inputValid} type={'submit'}>
          Войти
        </ButtonMedium>
      </form>
      <Link className={'sign-in__link'} to={RouteNames.SIGNUP}>Создать аккаунт</Link>
    </div>
  </main>
  );
};

export default SignIn;