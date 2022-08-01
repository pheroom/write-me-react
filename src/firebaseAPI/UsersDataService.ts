import UsersService from "./UsersService";
import {User as FirebaseUser} from "@firebase/auth";
import ProfileService from "./ProfileService";

export default class UsersDataService {
  static async updateLogin(user: FirebaseUser, newLogin: string){
    if(user.displayName){
      await UsersService.updateLogin(user.displayName, newLogin, user.email as string)
    } else {
      await UsersService.addEmailWithLogin(newLogin, user.email as string)
    }
    await ProfileService.updateLogin(user, newLogin)
  }
}
