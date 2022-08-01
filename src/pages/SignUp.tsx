import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {RouteNames} from "../router";
import {useInput} from "../hooks/useInput";
import {getAuth} from "firebase/auth";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {useAppDispatch, useAppSelector} from "../store";
import {userSignUp} from "../store/UserReducers/UserActionCreators";

const SignUp = () => {
  const login = useInput('', {minLength: 3, maxLength: 16, isEmpty: false})
  const email = useInput('', {isNotEmail: false, isEmpty: false})
  const password = useInput('', {minLength: 6, maxLength: 20, isEmpty: true})

  const dispatch = useAppDispatch()
  const {data, isLoading, error} = useAppSelector(state => state.user)

  function signUp(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    dispatch(userSignUp({login: login.value, email: email.value, password: password.value}))
  }

  if(isLoading) return <div>loading...</div>

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={signUp}>
        {(login.isDirty && login.isEmpty) && <div>is empty</div>}
        {(login.isDirty && !login.isEmpty && login.isMinLength) && <div>min length</div>}
        {(login.isDirty && login.isMaxLength) && <div>max length</div>}
        <input
          type="text"
          value={login.value}
          onChange={login.onChange}
          onBlur={login.onBlur}
          placeholder={'Lогин'}
        />
        {(email.isDirty && email.isEmpty) && <div>is empty</div>}
        {(email.isDirty && !email.isEmpty && email.isNotEmail) && <div>is not email</div>}
        <input
          type="text"
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          placeholder={'Электронная почта'}
        />
        {(password.isDirty && password.isEmpty) && <div>is empty</div>}
        {(password.isDirty && !password.isEmpty && password.isMinLength) && <div>min length</div>}
        {(password.isDirty && password.isMaxLength) && <div>max length</div>}
        <input
          type="text"
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
          placeholder={'Пароль'}
        />
        <button disabled={!login.inputValid || !email.inputValid || !password.inputValid} type={'submit'}>Sign Un</button>
      </form>
      <Link to={RouteNames.SIGNIN}>to sign in</Link>
    </div>
  );
};

export default SignUp;