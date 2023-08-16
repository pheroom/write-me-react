import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppDispatch, useAppSelector} from "../store";
import {userSignIn} from "../store/UserReducers/UserActionCreators";
import Loader from "../UI/Loaders/Loader";
import {userSlice} from "../store/UserReducers/UserSlice";
import Button from "../UI/ButtonsBase/Button";
import InputLabeled from "../UI/InputsBase/InputLabeled";
import {useInput} from "../hooks/useInput";
import {loginRule, passwordRule} from "../utils/validationRules";
import TemporaryError from "../UI/Errors/TemporaryError";

const SignIn = () => {
  const login = useInput('', loginRule)
  const password = useInput('', passwordRule)

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
    {error && <TemporaryError time={5000} resetError={() => dispatch(resetError())}>
      {error}
    </TemporaryError>}
    <div className="sign-in__inner">
      <h3 className={'sign-in__title'}>Вход</h3>
      <form onSubmit={signIn} className={'sign-in__form'}>
        <InputLabeled
          autoFocus
          boxClassName={'sign-in__input-box'}
          label={'Имя пользователя'}
          value={login.value}
          error={login.isDirty && !login.inputValid}
          onChange={login.onChange}
          onBlur={login.onBlur}
        />
        <InputLabeled
          boxClassName={'sign-in__input-box'}
          label={'Пароль'}
          value={password.value}
          error={password.isDirty && !password.inputValid}
          onChange={password.onChange}
          onBlur={password.onBlur}
        />
        <div className="sign-in__actions">
          <Button className={'sign-in__button'} disabled={!login.inputValid || !password.inputValid} type={'submit'}>
            Войти
          </Button>
          <Link className={'sign-in__link'} to={RouteNames.SIGNUP}>Создать аккаунт</Link>
        </div>
      </form>
    </div>
  </main>
  );
};

export default SignIn;