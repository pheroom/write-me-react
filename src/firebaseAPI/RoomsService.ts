import {get, getDatabase, ref, remove, serverTimestamp, set, update} from "firebase/database";
import {ParticipantStatuses} from "../models/IRoom";
// @ts-ignore
import uniqid from 'uniqid';
import {IMessage} from "../models/IMessage";

export default class RoomsService {
  static async addRoom(authorId: string, title: string, isPrivate: boolean, photoUrl: string | null) {
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
      description: '',
      applications: [],
      blockedList: []
    })
    return await RoomsService.getRoom(roomId)
  }
  static async getRoom(roomId: string) {
    const response = await get(ref(getDatabase(), 'roomsInfo/' + roomId))
    if(!response.exists())
      throw new Error('Комната не найдена')
    return response.val()
  }
  static async deleteRoom(roomId: string, uid: string) {
    const room = await RoomsService.getRoom(roomId)
    if(room && room.participants[uid] !== ParticipantStatuses.HOST)
      throw new Error('Вы не можете удалить комнату ' + room.title)
    await remove(ref(getDatabase(), 'roomsInfo/' + roomId))
    return roomId
  }
  static async blockUser(roomId: string, uid: string, blockedUid: string) {
    const room = await RoomsService.getRoom(roomId)
    if(room && room.participants[uid] !== ParticipantStatuses.HOST)
      throw new Error('Вы не можете блокировать кого-то в этой комнате')
    delete room.participants[blockedUid]
    const newParticipants = {...room.participants}
    const newBlockedList = room.blockedList ? [...room.blockedList, blockedUid] : [blockedUid]
    await update(ref(getDatabase(), 'roomsInfo/' + roomId), {participants: newParticipants, blockedList: newBlockedList})
    return {participants: newParticipants, blockedList: newBlockedList}
  }
  static async unblockUser(roomId: string, uid: string, blockedUid: string) {
    const room = await RoomsService.getRoom(roomId)
    if(room && room.participants[uid] !== ParticipantStatuses.HOST)
      throw new Error('Вы не можете разблокировать кого-то в этой комнате')
    const newBlockedList = room.blockedList ? room.blockedList.filter((userId: string) => userId !== blockedUid) : []
    await update(ref(getDatabase(), 'roomsInfo/' + roomId), {blockedList: newBlockedList})
    return newBlockedList
  }
  static async addParticipant(roomId: string, uid: string) {
    const room = await RoomsService.getRoom(roomId)
    const newParticipants = {...room.participants, [uid]: ParticipantStatuses.COMMON}
    await update(ref(getDatabase(), 'roomsInfo/' + roomId), {participants: newParticipants})
    return newParticipants
  }
  static async removeParticipant(roomId: string, uid: string) {
    const room = await RoomsService.getRoom(roomId)
    if(room.participants[uid] === ParticipantStatuses.HOST)
      throw new Error('Вы не можете покинуть эту группу')
    delete room.participants[uid]
    const newParticipants = {...room.participants}
    await update(ref(getDatabase(), 'roomsInfo/' + roomId), {participants: newParticipants})
    return newParticipants
  }
  static async updateParticipant(roomId: string, uid: string, newStatus: ParticipantStatuses) {
    const room = await RoomsService.getRoom(roomId)
    const newParticipants = {...room.participants, [uid]: newStatus}
    await update(ref(getDatabase(), 'roomsInfo/' + roomId), {participants: newParticipants})
    return newParticipants
  }
  static async addApplication(roomId: string, aid: string) {
    const room = await RoomsService.getRoom(roomId)
    const newApplications = room.applications ? [...room.applications, aid] : [aid]
    await update(ref(getDatabase(), 'roomsInfo/' + roomId), {applications: newApplications})
    return newApplications
  }
  static async acceptApplication(roomId: string, uid: string, aid: string) {
    const room = await RoomsService.getRoom(roomId)
    if(room.participants[uid] !== ParticipantStatuses.HOST)
      throw new Error('У ваc нет прав на это действие')
    const newParticipants = {...room.participants, [aid]: ParticipantStatuses.COMMON}
    const newApplications = room.applications ? room.applications.filter((userId: string) => userId !== aid) : []
    await update(ref(getDatabase(), 'roomsInfo/' + roomId), {participants: newParticipants, applications: newApplications})
    return {participants: newParticipants, applications: newApplications}
  }
  static async rejectApplication(roomId: string, uid: string, aid: string) {
    const room = await RoomsService.getRoom(roomId)
    if(room.participants[uid] !== ParticipantStatuses.HOST)
      throw new Error('У ваc нет прав на это действие')
    const newApplications = room.applications ? room.applications.filter((userId: string) => userId !== aid) : []
    await update(ref(getDatabase(), 'roomsInfo/' + roomId), {applications: newApplications})
    return newApplications
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
  }
  static async getMessages(roomId: string) {
    const response = await get(ref(getDatabase(), 'roomsMessages' + roomId))
    return response.exists() && Object.values(response.val())
  }
  static async removeMessage(message: IMessage, uid: string) {
    const room = await RoomsService.getRoom(message.roomId)
    if(message.authorId !== uid && room.participants[uid] !== ParticipantStatuses.HOST && room.participants[uid] !== ParticipantStatuses.ADMIN){
      throw new Error('Вы не можете удалить это сообщение')
    }
    await remove(ref(getDatabase(), `roomsMessages/${message.roomId}/${message.messageId}`))
  }
}
