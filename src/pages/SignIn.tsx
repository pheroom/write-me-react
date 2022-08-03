import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppDispatch, useAppSelector} from "../store";
import {isEmail} from "../utils/isEmail";
import {userSignIn} from "../store/UserReducers/UserActionCreators";
import {useLoginInput} from "../UI/useLoginInput";
import {usePasswordInput} from "../UI/usePasswordInput";
import Loader from "../UI/Loader";

const SignIn = () => {
  const {loginInput, login} = useLoginInput('')
  const {passwordInput, password} = usePasswordInput('')

  const dispatch = useAppDispatch()
  const {data, isLoading, error} = useAppSelector(state => state.user)

  function signIn(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    dispatch(userSignIn({login: login.value, password: password.value}))
  }

  if(isLoading) return <Loader/>

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={signIn}>
        {loginInput}
        {passwordInput}
        <button disabled={!login.inputValid || !password.inputValid} type={'submit'}>Sign In</button>
      </form>
      <Link to={RouteNames.SIGNUP}>to sign up</Link>
    </div>
  );
};

export default SignIn;