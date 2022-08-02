import {getDatabase, ref, update, get, set, remove} from "firebase/database";

export default class NamesService {
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
  static async updateData(login: string, email: string, updates: {login?: string, email?: string}){
    if(updates.login){
      await NamesService.removeEmailWithLogin(login, email)
      await NamesService.addEmailWithLogin(updates.login, updates.email || email)
    } else if(updates.email){
      await update(ref(getDatabase(), 'names'), {[login]: updates.email})
    }
  }
  static async isUniqueLogin(login: string) {
    const data = await get(ref(getDatabase(), 'names/' + login))
    return !data.exists()
  }
  static async isUniqueEmail(email: string) {
    const data = await get(ref(getDatabase(), 'names'))
    return !data.exists() || !Object.values(data.val()).includes(email)
  }
}
