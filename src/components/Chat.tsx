import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import {userSlice} from "../store/UserReducers/UserSlice";
import {useAppDispatch} from "../store";

const Chat = () => {

  const dispatch = useAppDispatch()
  const {setUser} = userSlice.actions

  const auth = getAuth();

  function logout(){
    signOut(auth)
    dispatch(setUser(null))
  }

  return (
    <div>
      chat
      <br/>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Chat;