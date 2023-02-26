import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppDispatch, useAppSelector} from "../store";
import {userSignUp} from "../store/UserReducers/UserActionCreators";
import Loader from "../UI/Loaders/Loader";
import Error from "../UI/Errors/Error";
import {userSlice} from "../store/UserReducers/UserSlice";
import {useInput} from "../hooks/useInput";
import {emailRule, loginRule, passwordRule} from "../utils/validationRules";
import InputLabeled from "../UI/InputsBase/InputLabeled";
import Button from "../UI/ButtonsBase/Button";

const SignUp = () => {
  const login = useInput('', loginRule)
  const email = useInput('', emailRule)
  const password = useInput('', passwordRule)

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
          <Error>{error}</Error>
        </div>}
        <form onSubmit={signUp} className={'sign-up__form'}>
          <InputLabeled
            autoFocus
            boxClassName={'sign-up__input-box'}
            label={'Имя пользователя'}
            value={login.value}
            error={login.isDirty && !login.inputValid}
            onChange={login.onChange}
            onBlur={login.onBlur}
          />
          <InputLabeled
            boxClassName={'sign-in__input-box'}
            label={'Почта'}
            value={email.value}
            error={email.isDirty && !email.inputValid}
            onChange={email.onChange}
            onBlur={email.onBlur}
          />
          <InputLabeled
            boxClassName={'sign-up__input-box'}
            label={'Пароль'}
            value={password.value}
            error={password.isDirty && !password.inputValid}
            onChange={password.onChange}
            onBlur={password.onBlur}
          />
          <div className="sign-in__actions">
            <Button className={'sign-in__button'} disabled={!login.inputValid || !password.inputValid} type={'submit'}>
              Создать
            </Button>
            <Link className={'sign-up__link'} to={RouteNames.SIGNIN}>Войти в аккаунт</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;

