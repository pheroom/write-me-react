import {getDatabase, ref, update, get, set, remove, push, serverTimestamp} from "firebase/database";
import {IParticipant, IRoom, ParticipantStatuses} from "../models/IRoom";
// @ts-ignore
import uniqid from 'uniqid';

export default class RoomsService {
  static async addRoom(authorId: string, title: string, isPrivate: boolean) {
    const roomId = uniqid()
    await set(ref(getDatabase(), 'roomsInfo/' + roomId), {
      roomId,
      authorId,
      participants: {[authorId]: ParticipantStatuses.HOST},
      title,
      createdAt: serverTimestamp(),
      isPrivate,
      avatarURL: null,
      isDialog: false,
    })
    return await RoomsService.getRoom(roomId)
  }
  static async getRoom(roomId: string) {
    const response = await get(ref(getDatabase(), 'roomsInfo/' + roomId))
    return response.exists() && response.val()
  }
  static async getAllRooms() {
    const response = await get(ref(getDatabase(), 'roomsInfo'))
    return response.exists() && Object.values(response.val())
  }
}
