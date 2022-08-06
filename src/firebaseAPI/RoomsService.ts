import {getDatabase, ref, update, get, set, remove, push, serverTimestamp} from "firebase/database";
import {IParticipant, IRoom, ParticipantStatuses} from "../models/IRoom";
// @ts-ignore
import uniqid from 'uniqid';
import {IMessage} from "../models/IMessage";

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
  static async deleteRoom(roomId: string, uid: string) {
    const room = await RoomsService.getRoom(roomId)
    if(!room)
      throw new Error('Комната не найдена')
    if(room && room.participants.uid === ParticipantStatuses.HOST)
      throw new Error('Вы не можете удалить комнату ' + room.title)
    await remove(ref(getDatabase(), 'roomsInfo/' + roomId))
    return roomId
  }
  static async getAllRooms() {
    const response = await get(ref(getDatabase(), 'roomsInfo'))
    return response.exists() && Object.values(response.val())
  }
  static async addMessage(roomId: string, authorId: string, text: string) {
    const messageId = uniqid()
    await set(ref(getDatabase(), `roomsMessages/${roomId}/${messageId}`), {
      messageId,
      roomId,
      authorId,
      text,
      createdAt: serverTimestamp(),
    })
    // const response = await get(ref(getDatabase(), 'roomsInfo' + ))
    // return response.exists() && Object.values(response.val())
  }
  static async getMessages(roomId: string) {
    const response = await get(ref(getDatabase(), 'roomsMessages' + roomId))
    return response.exists() && Object.values(response.val())
  }
  static async removeMessage() {
    const response = await get(ref(getDatabase(), 'roomsInfo'))
    return response.exists() && Object.values(response.val())
  }
}
