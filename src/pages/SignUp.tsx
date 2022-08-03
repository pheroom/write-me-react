import React from 'react';
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import {useAppDispatch, useAppSelector} from "../store";
import {userSignUp} from "../store/UserReducers/UserActionCreators";
import {useLoginInput} from "../UI/useLoginInput";
import {usePasswordInput} from "../UI/usePasswordInput";
import {useEmailInput} from "../UI/useEmailInput";
import Loader from "../UI/Loader";

const SignUp = () => {
  const {loginInput, login} = useLoginInput('')
  const {emailInput, email} = useEmailInput('')
  const {passwordInput, password} = usePasswordInput('')

  const dispatch = useAppDispatch()
  const {data, isLoading, error} = useAppSelector(state => state.user)

  function signUp(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    dispatch(userSignUp({login: login.value, email: email.value, password: password.value}))
  }

  if(isLoading) return <Loader/>

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={signUp}>
        {loginInput}
        {emailInput}
        {passwordInput}
        <button disabled={!login.inputValid || !email.inputValid || !password.inputValid} type={'submit'}>Sign Un</button>
      </form>
      <Link to={RouteNames.SIGNIN}>to sign in</Link>
    </div>
  );
};

export default SignUp;

