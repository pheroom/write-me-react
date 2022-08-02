import {getDatabase, ref, update, get, set} from "firebase/database";
import {IUser} from "../models/IUser";
import {IUserUpdates} from "../models/IUserUpdates";

export default class UsersService {
  static async addNewUser(user: IUser) {
    await set(ref(getDatabase(), 'users/' + user.uid), user)
  }
  static async getUser(uid: string) {
    const response = await get(ref(getDatabase(), 'users/' + uid))
    return response.exists() && response.val()
  }
  static async updateUser(uid: string, updates: IUserUpdates) {
    await update(ref(getDatabase(), 'users/' + uid), updates)
  }
}
