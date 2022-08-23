import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppDispatch, useAppSelector} from "../store";
import {userSignUp} from "../store/UserReducers/UserActionCreators";
import {useLoginInput} from "../UI/InputsApplied/useLoginInput";
import {usePasswordInput} from "../UI/InputsApplied/usePasswordInput";
import {useEmailInput} from "../UI/InputsApplied/useEmailInput";
import Loader from "../UI/Loader";
import ButtonMedium from "../UI/ButtonsBase/ButtonMedium";
import Error from "../UI/Error";
import {userSlice} from "../store/UserReducers/UserSlice";

const SignUp = () => {
  const {loginInput, login} = useLoginInput('', 'sign-up__input', 'sign-up__input-box')
  const {emailInput, email} = useEmailInput('', 'sign-up__input', 'sign-up__input-box')
  const {passwordInput, password} = usePasswordInput('', 'sign-up__input', 'sign-up__input-box')

  const dispatch = useAppDispatch()
  const {resetError} = userSlice.actions
  const {isLoading, error} = useAppSelector(state => state.user)

  useEffect(()=>{
    return () => {
      dispatch(resetError())
    }
  }, [])

  function signUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(userSignUp({login: login.value, email: email.value, password: password.value}))
  }

  if(isLoading) return <Loader/>
  return (
    <main className={'sign-up'}>
      <div className="sign-up__inner">
        <h3 className={'sign-up__title'}>Регистрация</h3>
        {error && <div className={'sign-in__error'}>
          <Error message={error}/>
        </div>}
        <form onSubmit={signUp} className={'sign-up__form'}>
          {loginInput}
          {emailInput}
          {passwordInput}
          <ButtonMedium className={'sign-up__button'} disabled={!login.inputValid || !email.inputValid || !password.inputValid} type={'submit'}>
            Зарегистрироваться
          </ButtonMedium>
        </form>
        <Link className={'sign-up__link'} to={RouteNames.SIGNIN}>Войти в аккаунт</Link>
      </div>
    </main>
  );
};

export default SignUp;

