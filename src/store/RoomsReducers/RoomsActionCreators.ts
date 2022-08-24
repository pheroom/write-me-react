import {createAsyncThunk} from "@reduxjs/toolkit";
import RoomsService from "../../firebaseAPI/RoomsService";

export const createRoom = createAsyncThunk(
  'rooms/createRoom',
  async (room: {authorId: string, title: string, isPrivate: boolean, photoUrl: string | null}) => {
    return await RoomsService.addRoom(room.authorId, room.title, room.isPrivate, room.photoUrl)
  }
)

export const getAllRooms = createAsyncThunk(
  'rooms/getAllRooms',
  async () => {
    return await RoomsService.getAllRooms()
  }
)

export const removeRoom = createAsyncThunk(
  'rooms/removeRoom',
  async ({roomId, uid}: {roomId: string, uid: string}) => {
    return await RoomsService.deleteRoom(roomId, uid)
  }
)



