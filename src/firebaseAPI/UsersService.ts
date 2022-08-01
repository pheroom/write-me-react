import {getDatabase, ref, update, get, set, remove} from "firebase/database";
import {IUser} from "../models/IUser";

export default class UsersService {
  static async addNewUser(user: IUser) {
    await set(ref(getDatabase(), 'users/' + user.uid), user)
  }
  static async getUser(uid: string) {
    const response = await get(ref(getDatabase(), 'users/' + uid))
    return response.val()
  }
  static async addEmailWithLogin(login: string, email: string) {
    await set(ref(getDatabase(), 'names/' + login), email)
  }
  static async removeEmailWithLogin(login: string, email: string) {
    await remove(ref(getDatabase(), 'names/' + login))
  }
  static async getEmailByLogin(login: string) {
    const data = await get(ref(getDatabase(), 'names/' + login))
    return data.exists() && data.val()
  }
  static async updateEmail(login: string, newEmail: string) {
    await update(ref(getDatabase(), 'names'), {[login]: newEmail})
  }
  static async updateLogin(login: string, newLogin: string, email: string) {
    await UsersService.removeEmailWithLogin(login, email)
    await UsersService.addEmailWithLogin(newLogin, email)
  }
  static async isUniqueLogin(login: string) {
    const data = await get(ref(getDatabase(), 'users/' + login))
    return !data.exists()
  }
  static async isUniqueEmail(email: string) {
    const data = await get(ref(getDatabase(), 'users'))
    return !data.exists() || !Object.values(data.val()).includes(email)
  }
}
