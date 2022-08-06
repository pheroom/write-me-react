import {createSlice} from "@reduxjs/toolkit";
import {IRoom} from "../../models/IRoom";
import {addMessage, setRoomById} from "./RoomActionCreators";
import {IMessage} from "../../models/IMessage";

interface RoomsState {
  data: {room: null | IRoom, messages: null | IMessage[]}
  isLoading: boolean
  error: string
}

const initialState = {
  data: {room: null, messages: null},
  isLoading: false,
  error: ''
} as RoomsState

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom(state, action){
      state.data.room = action.payload
    },
    setMessages(state, action){
      state.data.messages = action.payload
    }
  },
  extraReducers: {
    [setRoomById.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      state.data.room = action.payload;
    },
    [setRoomById.pending.type]: (state) => {
      state.isLoading = true;
    },
    [setRoomById.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [addMessage.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      // state.data = action.payload;
    },
    [addMessage.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addMessage.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
  }
})

export default roomSlice.reducer