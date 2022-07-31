import {updateProfile} from "firebase/auth";
import {User as FirebaseUser } from '@firebase/auth';

export default class ProfileService {
  static async updateLogin(user: FirebaseUser, newLogin: string) {
    if(user){
      await updateProfile(user, {displayName: newLogin}).catch((e)=>console.log(e))
    }
  }
}
