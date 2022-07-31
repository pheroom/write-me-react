import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../firebaseAPI/AuthService";

export const userSignIn = createAsyncThunk(
  'user/signIn',
  async (user: {email: string, password: string}) => {
    return await AuthService.signInWithEmailAndPassword(user.email, user.password)
  }
)

export const userSignUp = createAsyncThunk(
  'user/signUp',
  async (user: {login: string, email: string, password: string}) => {
    return await AuthService.createUserWithEmailAndPassword(user.login, user.email, user.password)
  }
)