import {get, getDatabase, ref, remove, serverTimestamp, set, update} from "firebase/database";
import {IRoom, ParticipantStatuses} from "../models/IRoom";
// @ts-ignore
import uniqid from 'uniqid';
import {IMessage} from "../models/IMessage";
import StorageService from "./StorageService";
import {getFileImgFromUrl} from "../utils/getFileImgFromUrl";
import {User as FirebaseUser} from "@firebase/auth";
import {IRoomUpdates} from "../models/IRoomUpdates";

export default class RoomsService {
  static async addRoom(authorId: string, title: string, isPrivate: boolean, photoUrl: string | null) {
    const roomId = uniqid()
    const photoFile = typeof photoUrl === 'string' ? await getFileImgFromUrl(photoUrl) : photoUrl
    const photoServerUrl = photoFile ? await StorageService.addRoomAvatar(roomId, photoFile) : photoFile
    await set(ref(getDatabase(), 'roomsInfo/' + roomId), {
      roomId,
      authorId,
      participants: {[authorId]: ParticipantStatuses.HOST},
      title,
      createdAt: serverTimestamp(),
      isPrivate,
      avatarURL: photoServerUrl || null,
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
      throw new Error('Группа не найдена')
    return response.val()
  }
  static async deleteRoom(roomId: string, uid: string) {
    const room = await RoomsService.getRoom(roomId)
    if(room && room.participants[uid] !== ParticipantStatuses.HOST)
      throw new Error('Вы не можете удалить группу ' + room.title)
    await remove(ref(getDatabase(), 'roomsInfo/' + roomId))
    return roomId
  }
  static async updateRoom(user: FirebaseUser | null, room: IRoom, updates: IRoomUpdates){
    if (!user || (room.participants[user.uid] !== ParticipantStatuses.HOST)) {
      throw new Error('Вы не можете редактировать эту группу')
    }
    let upd: IRoomUpdates = {}
    if(updates.photo){
      const photoFile = typeof updates.photo === 'string' ? await getFileImgFromUrl(updates.photo) : updates.photo
      const photoURL = photoFile ? await StorageService.addRoomAvatar(room.roomId, photoFile) : photoFile
      upd = {...upd, photoURL}
    }
    if(updates.title){
      upd = {...upd, title: updates.title}
    }
    if(typeof updates.isPrivate === 'boolean'){
      upd = {...upd, isPrivate: updates.isPrivate}
    }
    if(typeof updates.descriptions === 'string'){
      upd = {...upd, descriptions: updates.descriptions}
    }

    await update(ref(getDatabase(), 'roomsInfo/' + room.roomId), upd)
    return await RoomsService.getRoom(room.roomId)
  }
  static async blockUser(roomId: string, uid: string, blockedUid: string) {
    const room = await RoomsService.getRoom(roomId)
    if(room && room.participants[uid] !== ParticipantStatuses.HOST)
      throw new Error('Вы не можете блокировать кого-то в этой группе')
    if(room && room.participants[blockedUid] === ParticipantStatuses.HOST)
      throw new Error('Нельзя заблокировать создателя группы')
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
  static async addParticipant(roomId: string, pid: string) {
    const room = await RoomsService.getRoom(roomId)
    const newParticipants = {...room.participants, [pid]: ParticipantStatuses.COMMON}
    await update(ref(getDatabase(), 'roomsInfo/' + roomId), {participants: newParticipants})
    return newParticipants
  }
  static async removeParticipant(roomId: string, pid: string) {
    const room = await RoomsService.getRoom(roomId)
    if(room.participants[pid] === ParticipantStatuses.HOST)
      throw new Error('Вы не можете покинуть эту группу')
    delete room.participants[pid]
    const newParticipants = {...room.participants}
    await update(ref(getDatabase(), 'roomsInfo/' + roomId), {participants: newParticipants})
    return newParticipants
  }
  static async updateParticipant(roomId: string, uid: string, pid: string, newStatus: ParticipantStatuses) {
    const room = await RoomsService.getRoom(roomId)
    if(room.participants[uid] !== ParticipantStatuses.HOST)
      throw new Error('У ваc нет прав на это действие')
    if(room.participants[pid] === ParticipantStatuses.HOST)
      throw new Error('Вы не можете обновлять свой статус')
    const newParticipants = {...room.participants, [pid]: newStatus}
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
