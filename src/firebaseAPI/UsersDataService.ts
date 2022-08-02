import UsersService from "./UsersService";
import {User as FirebaseUser} from "@firebase/auth";
import ProfileService from "./ProfileService";
import {IUserUpdates} from "../models/IUserUpdates";
import {getUserByFirebaseObject} from "../utils/getUserByFirebaseObject";
import NamesService from "./NamesService";
import StorageService from "./StorageService";
import AuthService from "./AuthService";

export default class UsersDataService {
  static async firstUpdateLogin(user: FirebaseUser, newLogin: string){
    await NamesService.addEmailWithLogin(newLogin, user.email as string)
    await ProfileService.updateLogin(user, newLogin)
  }
  static async updateData(user: FirebaseUser, updates: IUserUpdates){
    if (updates.email && updates.email !== user.email  && !await NamesService.isUniqueEmail(updates.email)) {
      throw new Error('Аккаунт с такой почтой уже существует')
    }
    if (updates.displayName && updates.displayName !== user.displayName && !await NamesService.isUniqueLogin(updates.displayName)) {
      throw new Error('Аккаунт с таким именем уже существует')
    }
    let upd: IUserUpdates = {...updates}
    if(updates.photo){
      let photoURL = await StorageService.addAvatar(user.uid, updates.photo)
      upd = {...upd, photoURL}
    }
    if(updates.displayName){
      await NamesService.updateData(user.displayName as string, user.email as string, {login: updates.displayName, email: updates.email})
    } else if(updates.email){
      await NamesService.updateData(user.displayName as string, user.email as string, {email: updates.email})
    }
    await ProfileService.updateData(user, upd)
    await UsersService.updateUser(user.uid, upd)
    return getUserByFirebaseObject(user)
  }
  static async changePassword(user: FirebaseUser, email: string, password: string, newPassword: string){
    const response = await AuthService.signInWithEmailAndPassword(email, password)
    await ProfileService.updatePassword(user, newPassword)
    return response
  }
}
