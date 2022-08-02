import { getStorage, ref, uploadBytes } from "firebase/storage";
import {getUrlOfStorage} from "../utils/getUrlOfStorage";

export default class StorageService {
  static async addAvatar(uid: string, photo: File){
    await uploadBytes(ref(getStorage(), 'avatars/' + uid), photo)
    return getUrlOfStorage('avatars/' + uid)
  }
}

