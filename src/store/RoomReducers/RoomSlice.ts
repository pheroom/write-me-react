import {createSlice} from "@reduxjs/toolkit";
import {IRoom} from "../../models/IRoom";
import {
  acceptApplication,
  addApplication,
  addMessage,
  addParticipant, blockUser, getMessages, getRoomById, getRoomData, rejectApplication,
  removeMessage, removeParticipant, unblockUser, updateParticipant,
} from "./RoomActionCreators";
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
    [getRoomById.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      state.data.room = action.payload;
    },
    [getRoomById.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getRoomById.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [getMessages.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      state.data.messages = action.payload;
    },
    [getMessages.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getMessages.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [getRoomData.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      state.data = action.payload;
    },
    [getRoomData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getRoomData.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [addMessage.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
    },
    [addMessage.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addMessage.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [removeMessage.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
    },
    [removeMessage.pending.type]: (state) => {
      state.isLoading = true;
    },
    [removeMessage.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [blockUser.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      if(state.data.room) {
        state.data.room.participants = action.payload.participants
        state.data.room.applications = action.payload.applications
      }
    },
    [blockUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [blockUser.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [unblockUser.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      if(state.data.room) {
        state.data.room.blockedList = action.payload
      }
    },
    [unblockUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [unblockUser.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [addParticipant.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      if(state.data.room) {
        state.data.room.participants = action.payload
      }
    },
    [addParticipant.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addParticipant.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [removeParticipant.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      if(state.data.room) {
        state.data.room.participants = action.payload
      }
    },
    [removeParticipant.pending.type]: (state) => {
      state.isLoading = true;
    },
    [removeParticipant.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [updateParticipant.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      if(state.data.room) {
        state.data.room.participants = action.payload
      }
    },
    [updateParticipant.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateParticipant.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [addApplication.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      if(state.data.room){
        state.data.room.applications = action.payload
      }
    },
    [addApplication.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addApplication.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [acceptApplication.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      if(state.data.room){
        state.data.room.applications = action.payload.applications
        state.data.room.participants = action.payload.participants
      }
    },
    [acceptApplication.pending.type]: (state) => {
      state.isLoading = true;
    },
    [acceptApplication.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
    [rejectApplication.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = ''
      if(state.data.room){
        state.data.room.applications = action.payload.applications
      }
    },
    [rejectApplication.pending.type]: (state) => {
      state.isLoading = true;
    },
    [rejectApplication.rejected.type]: (state,  action) => {
      state.isLoading = false;
      console.log(action)
      state.error = action.error.message
    },
  }
})

export default roomSlice.reducer