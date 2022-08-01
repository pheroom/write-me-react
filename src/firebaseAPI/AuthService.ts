import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {getUserByFirebaseObject} from "../utils/getUserByFirebaseObject";
import ProfileService from "./ProfileService";
import UsersService from "./UsersService";
import UsersDataService from "./UsersDataService";

export default class AuthService {
  static async signInWithEmailAndPassword(email: string, password: string) {
    const response = await signInWithEmailAndPassword(getAuth(), email, password)
    return getUserByFirebaseObject(response.user)
  }
  static async signInWithLoginAndPassword(login: string, password: string) {
    const email = await UsersService.getEmailByLogin(login)
    const response = await signInWithEmailAndPassword(getAuth(), email, password)
    return getUserByFirebaseObject(response.user)
  }
  static async createUserWithEmailAndPassword(login: string, email: string, password: string) {
    if(await UsersService.isUniqueLogin(login) && await UsersService.isUniqueEmail(email)){
      const response = await createUserWithEmailAndPassword(getAuth(), email, password)
      await UsersDataService.updateLogin(response.user, login)
      const user = getUserByFirebaseObject(response.user)
      await UsersService.addNewUser(user)
      return user
    }
  }
}
