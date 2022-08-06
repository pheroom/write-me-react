import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRoom} from "../../models/IRoom";
import {createRoom, getAllRooms, removeRoom} from "./RoomsActionCreators";

interface RoomsState {
  data: null | IRoom[]
  isLoading: boolean
  error: string
}

const initialState = {
  data: null,
  isLoading: false,
  error: ''
} as RoomsState

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms(state, action){
      state.data = action.payload
    }
  },
  extraReducers: {
    [createRoom.fulfilled.type]: (state, action: PayloadAction<IRoom>) => {
      state.isLoading = false;
      state.error = ''
      // state.data ? state.data.push(action.payload) : state.data = [action.payload];
    },
    [createRoom.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createRoom.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [removeRoom.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      // state.data = state.data ? state.data.filter(room => room.roomId !== action.payload) : null
    },
    [removeRoom.pending.type]: (state) => {
      state.isLoading = true;
    },
    [removeRoom.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [getAllRooms.fulfilled.type]: (state, action: PayloadAction<IRoom[]>) => {
      state.isLoading = false;
      state.error = ''
      state.data = action.payload;
    },
    [getAllRooms.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllRooms.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
  }
})

export default roomsSlice.reducer