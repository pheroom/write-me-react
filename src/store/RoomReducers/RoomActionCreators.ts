import {createAsyncThunk} from "@reduxjs/toolkit";
import RoomsService from "../../firebaseAPI/RoomsService";

export const setRoomById = createAsyncThunk(
  'room/setRoomById',
  async (roomId: string) => {
    return await RoomsService.getRoom(roomId)
  }
)

export const addMessage = createAsyncThunk(
  'room/addMessage',
  async ({roomId, authorId, text}: {roomId: string, authorId: string, text: string}) => {
    return await RoomsService.addMessage(roomId, authorId, text)
  }
)