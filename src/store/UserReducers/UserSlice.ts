import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";
import {userSignInWithEmail, userSignInWithLogin, userSignUp} from "./UserActionCreators";

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
    [userSignInWithLogin.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = ''
      state.data = action.payload;
    },
    [userSignInWithLogin.pending.type]: (state) => {
      state.isLoading = true;
    },
    [userSignInWithLogin.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [userSignInWithEmail.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = ''
      state.data = action.payload;
    },
    [userSignInWithEmail.pending.type]: (state) => {
      state.isLoading = true;
    },
    [userSignInWithEmail.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
  }
})

export default userSlice.reducer