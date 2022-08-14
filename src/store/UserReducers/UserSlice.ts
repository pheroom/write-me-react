import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";
import {
  changePassword, signOut,
  updateUser,
  userSignIn, userSignUp
} from "./UserActionCreators";

interface UserState {
  data: null | IUser
  isLoading: boolean
  error: string
}

const initialState = {
  data: null,
  isLoading: false,
  error: ''
} as UserState

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action){
      state.data = action.payload
    },
    resetError(state){
      state.error = ''
    }
  },
  extraReducers: {
    [userSignUp.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = ''
      state.data = action.payload;
    },
    [userSignUp.pending.type]: (state) => {
      state.isLoading = true;
    },
    [userSignUp.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [userSignIn.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = ''
      state.data = action.payload;
    },
    [userSignIn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [userSignIn.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [updateUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = ''
      state.data = action.payload;
    },
    [updateUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateUser.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [changePassword.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = ''
      state.data = action.payload;
    },
    [changePassword.pending.type]: (state) => {
      state.isLoading = true;
    },
    [changePassword.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [signOut.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = ''
      state.data = action.payload;
    },
    [signOut.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signOut.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
  }
})

export default userSlice.reducer