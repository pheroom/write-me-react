import {createAsyncThunk} from "@reduxjs/toolkit";
import RoomsService from "../../firebaseAPI/RoomsService";
import {IMessage} from "../../models/IMessage";
import {ParticipantStatuses} from "../../models/IRoom";

export const getRoomById = createAsyncThunk(
  'room/getRoomById',
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

export const getMessages = createAsyncThunk(
  'room/getMessages',
  async (roomId: string) => {
    return await RoomsService.getMessages(roomId)
  }
)

export const removeMessage = createAsyncThunk(
  'room/removeMessage',
  async ({message, uid}: {message: IMessage, uid: string}) => {
    return await RoomsService.removeMessage(message, uid)
  }
)

export const addParticipant = createAsyncThunk(
  'room/addParticipant',
  async ({roomId, uid}: {roomId: string, uid: string}) => {
    return await RoomsService.addParticipant(roomId, uid)
  }
)

export const updateParticipant = createAsyncThunk(
  'room/updateParticipant',
  async ({roomId, uid, status}: {roomId: string, uid: string, status: ParticipantStatuses}) => {
    return await RoomsService.updateParticipant(roomId, uid, status)
  }
)

export const addApplication = createAsyncThunk(
  'room/addApplication',
  async ({roomId, uid}: {roomId: string, uid: string}) => {
    return await RoomsService.addApplication(roomId, uid)
  }
)

export const acceptApplication = createAsyncThunk(
  'room/acceptApplication',
  async ({roomId, uid}: {roomId: string, uid: string}) => {
    return await RoomsService.acceptApplication(roomId, uid)
  }
)

export const rejectApplication = createAsyncThunk(
  'room/rejectApplication',
  async ({roomId, uid}: {roomId: string, uid: string}) => {
    return await RoomsService.rejectApplication(roomId, uid)
  }
)