import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";
import {userSignIn, userSignUp} from "./UserActionCreators";

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
  }
})

export default userSlice.reducer