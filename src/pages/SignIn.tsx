import React, {useEffect} from 'react';
import {useInput} from "../hooks/useInput";
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppDispatch, useAppSelector} from "../store";
import {isEmail} from "../utils/isEmail";
import {userSignInWithEmail, userSignInWithLogin} from "../store/UserReducers/UserActionCreators";

const SignIn = () => {
  const login = useInput('', {minLength: 3, isEmpty: false})
  const password = useInput('', {minLength: 6, isEmpty: true})

  const dispatch = useAppDispatch()
  const {data, isLoading, error} = useAppSelector(state => state.user)

  function signIn(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(isEmail(login.value)){
      dispatch(userSignInWithEmail({email: login.value, password: password.value}))
    } else{
      dispatch(userSignInWithLogin({login: login.value, password: password.value}))
    }
  }

  if(isLoading) return <div style={{background: 'black'}}>loading...</div>

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={signIn}>
        {(login.isDirty && login.isEmpty) && <div>is empty</div>}
        {(login.isDirty && !login.isEmpty && login.isMinLength) && <div>min length</div>}
        <input
          type="text"
          value={login.value}
          onChange={login.onChange}
          onBlur={login.onBlur}
          placeholder={'Электронная почта или логин'}
        />
        {(password.isDirty && password.isEmpty) && <div>is empty</div>}
        {(password.isDirty && !password.isEmpty &&password.isMinLength) && <div>min length</div>}
        <input
          type="text"
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
          placeholder={'Пароль'}
        />
        <button disabled={!login.inputValid || !password.inputValid} type={'submit'}>Sign In</button>
      </form>
      <Link to={RouteNames.SIGNUP}>to sign up</Link>
    </div>
  );
};

export default SignIn;