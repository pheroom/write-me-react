import {createAsyncThunk} from "@reduxjs/toolkit";
import RoomsService from "../../firebaseAPI/RoomsService";

export const createRoom = createAsyncThunk(
  'rooms/createRoom',
  async (room: {authorId: string, title: string, isPrivate: boolean}) => {
    return await RoomsService.addRoom(room.authorId, room.title, room.isPrivate)
  }
)

export const getAllRooms = createAsyncThunk(
  'rooms/getAllRooms',
  async () => {
    return await RoomsService.getAllRooms()
  }
)





