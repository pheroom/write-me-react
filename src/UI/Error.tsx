import React, {FC, useEffect, useRef, useState} from 'react';
import rejectedIcon from '../assets/icons/rejected.png'
import {useAppDispatch} from "../store";
import {userSlice} from "../store/UserReducers/UserSlice";

interface ErrorProps{
  message: string
}

const Error: FC<ErrorProps> = ({message}) => {
  // const dispatch = useAppDispatch()
  // const {resetError} = userSlice.actions
  //
  // const timer = useRef<null | ReturnType<typeof setTimeout>>(null)
  //
  // useEffect(()=>{
  //   if (timer.current) {
  //     clearInterval(timer.current)
  //   }
  //   timer.current = setTimeout(() => {
  //     dispatch(resetError())
  //   }, 1000)
  //   return () => {
  //     if (timer.current) {
  //       clearInterval(timer.current)
  //     }
  //   }
  // }, [])

  return (
    <div className={'error'}>
      <span className={'error__text'}>{message}</span>
    </div>
  );
};

export default Error;