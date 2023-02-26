import {IUser} from "../models/IUser";
import UsersService from "../firebaseAPI/UsersService";

export function getUserByUid(uid: string, callback: (user: IUser) => void){
  UsersService.getUser(uid).then(user => callback(user))
}