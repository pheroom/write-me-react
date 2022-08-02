import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../firebaseAPI/AuthService";
import UsersDataService from "../../firebaseAPI/UsersDataService";
import {getAuth, User} from "firebase/auth";
import {IUserUpdates} from "../../models/IUserUpdates";
import {isEmail} from "../../utils/isEmail";

export const userSignIn = createAsyncThunk(
  'user/signIn',
  async (user: {login: string, password: string}) => {
    if(isEmail(user.login)){
      return await AuthService.signInWithEmailAndPassword(user.login, user.password)
    } else{
      return await AuthService.signInWithLoginAndPassword(user.login, user.password)
    }
  }
)

export const userSignUp = createAsyncThunk(
  'user/signUp',
  async (user: {login: string, email: string, password: string}) => {
    return await AuthService.createUserWithEmailAndPassword(user.login, user.email, user.password)
  }
)

export const updateUser = createAsyncThunk(
  'user/update',
  async (updates: IUserUpdates,) => {
    return await UsersDataService.updateData(getAuth().currentUser as User, updates)
  }
)

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (data: {password: string, email: string, newPassword: string},) => {
    return await UsersDataService.changePassword(getAuth().currentUser as User, data.email, data.password, data.newPassword)
  }
)



