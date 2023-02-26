import { getStorage, ref, uploadBytes } from "firebase/storage";
import {getUrlOfStorage} from "../utils/getUrlOfStorage";
import {generateIdByDate} from "../utils/generateId";

export default class StorageService {
  static async addAvatar(uid: string, photo: File){
    const id = generateIdByDate()
    await uploadBytes(ref(getStorage(), 'avatars/' + uid + '/' + id), photo)
    return getUrlOfStorage('avatars/' + uid + '/' + id)
  }
  static async addRoomAvatar(rid: string, photo: File){
    const id = generateIdByDate()
    await uploadBytes(ref(getStorage(), 'roomAvatars/' + rid + '/' + id), photo)
    return getUrlOfStorage('roomAvatars/' + rid + '/' + id)
  }
}

