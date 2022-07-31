import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {getUserByFirebaseObject} from "../utils/getUserByFirebaseObject";
import ProfileService from "./ProfileService";
import UsersService from "./UsersService";

export default class AuthService {
  static async signInWithEmailAndPassword(email: string, password: string) {
    const response = await signInWithEmailAndPassword(getAuth(), email, password)
    return getUserByFirebaseObject(response.user)
  }
  static async createUserWithEmailAndPassword(login: string, email: string, password: string) {
    const response = await createUserWithEmailAndPassword(getAuth(), email, password)
    await ProfileService.updateLogin(response.user, login)
    const user = getUserByFirebaseObject(response.user)
    await UsersService.addNewUser(user)
    return user
  }
}
