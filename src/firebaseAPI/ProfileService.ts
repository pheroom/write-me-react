import {updateProfile} from "firebase/auth";
import {User as FirebaseUser} from '@firebase/auth';

export default class ProfileService {
  static async updateLogin(user: FirebaseUser, newLogin: string) {
    await updateProfile(user, {displayName: newLogin})
  }
}
