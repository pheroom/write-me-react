import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {getUserByFirebaseObject} from "../utils/getUserByFirebaseObject";
import UsersService from "./UsersService";
import UsersDataService from "./UsersDataService";
import NamesService from "./NamesService";

export default class AuthService {
  static async signInWithEmailAndPassword(email: string, password: string) {
    if (await NamesService.isUniqueEmail(email)) {
      throw new Error('Аккаунта с такой почтой не существует')
    }
    const response = await signInWithEmailAndPassword(getAuth(), email, password)
    console.log(response)
    return getUserByFirebaseObject(response.user)
  }

  static async signInWithLoginAndPassword(login: string, password: string) {
    if (await NamesService.isUniqueLogin(login)) {
      throw new Error('Аккаунта с таким именем не существует')
    }
    const email = await NamesService.getEmailByLogin(login)
    const response = await signInWithEmailAndPassword(getAuth(), email, password)
    return getUserByFirebaseObject(response.user)
  }

  static async createUserWithEmailAndPassword(login: string, email: string, password: string) {
    if (!await NamesService.isUniqueLogin(login)) {
      throw new Error('Аккаунт с таким именем уже существует')
    }
    if (!await NamesService.isUniqueEmail(email)) {
      throw new Error('Аккаунт с такой почтой уже существует')
    }
    const response = await createUserWithEmailAndPassword(getAuth(), email, password)
    await UsersDataService.firstUpdateLogin(response.user, login)
    const user = getUserByFirebaseObject(response.user)
    await UsersService.addNewUser(user)
    return user
  }
}
