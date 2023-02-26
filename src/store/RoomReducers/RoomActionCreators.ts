import {createAsyncThunk} from "@reduxjs/toolkit";
import RoomsService from "../../firebaseAPI/RoomsService";
import {IMessage} from "../../models/IMessage";
import {IRoom, ParticipantStatuses} from "../../models/IRoom";
import {IRoomUpdates} from "../../models/IRoomUpdates";
import {getAuth} from "firebase/auth";

export const getRoomById = createAsyncThunk(
  'room/getRoomById',
  async (roomId: string) => {
    return await RoomsService.getRoom(roomId)
  }
)

export const updateRoom = createAsyncThunk(
  'room/updateRoom',
  async ({room, updates}: {room: IRoom, updates: IRoomUpdates}) => {
    return await RoomsService.updateRoom(getAuth().currentUser, room, updates)
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

export const getRoomData = createAsyncThunk(
  'room/getRoomData',
  async (roomId: string | null) => {
    if(!roomId)
      return {messages: null, room: null}
    return {messages: await RoomsService.getMessages(roomId), room: await RoomsService.getRoom(roomId)}
  }
)

export const removeMessage = createAsyncThunk(
  'room/removeMessage',
  async ({message, uid}: {message: IMessage, uid: string}) => {
    return await RoomsService.removeMessage(message, uid)
  }
)

export const blockUser = createAsyncThunk(
  'room/blockUser',
  async ({roomId, uid, blockedUid}: {roomId: string, uid: string, blockedUid: string}) => {
    return await RoomsService.blockUser(roomId, uid, blockedUid)
  }
)

export const unblockUser = createAsyncThunk(
  'room/unblockUser',
  async ({roomId, uid, blockedUid}: {roomId: string, uid: string, blockedUid: string}) => {
    return await RoomsService.unblockUser(roomId, uid, blockedUid)
  }
)

export const addParticipant = createAsyncThunk(
  'room/addParticipant',
  async ({roomId, uid}: {roomId: string, uid: string}) => {
    return await RoomsService.addParticipant(roomId, uid)
  }
)

export const removeParticipant = createAsyncThunk(
  'room/removeParticipant',
  async ({roomId, pid}: {roomId: string, pid: string}) => {
    return await RoomsService.removeParticipant(roomId, pid)
  }
)

export const updateParticipant = createAsyncThunk(
  'room/updateParticipant',
  async ({roomId, uid, pid, status}: {roomId: string, uid: string, pid: string, status: ParticipantStatuses}) => {
    return await RoomsService.updateParticipant(roomId, uid, pid, status)
  }
)

export const addApplication = createAsyncThunk(
  'room/addApplication',
  async ({roomId, aid}: {roomId: string, aid: string}) => {
    return await RoomsService.addApplication(roomId, aid)
  }
)

export const acceptApplication = createAsyncThunk(
  'room/acceptApplication',
  async ({roomId, uid, aid}: {roomId: string, uid: string, aid: string}) => {
    return await RoomsService.acceptApplication(roomId, uid, aid)
  }
)

export const rejectApplication = createAsyncThunk(
  'room/rejectApplication',
  async ({roomId, uid, aid}: {roomId: string, uid: string, aid: string}) => {
    return await RoomsService.rejectApplication(roomId, uid, aid)
  }
)