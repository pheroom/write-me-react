import {updateProfile, updateEmail, updatePassword} from "firebase/auth";
import {User as FirebaseUser} from '@firebase/auth';
import {IUserUpdates} from "../models/IUserUpdates";

export default class ProfileService {
  static async updateLogin(user: FirebaseUser, newLogin: string) {
    await updateProfile(user, {displayName: newLogin})
  }
  static async updatePhotoUrl(user: FirebaseUser, newPhotoUrl: string) {
    await updateProfile(user, {photoURL: newPhotoUrl})
  }
  static async updateEmail(user: FirebaseUser, newEmail: string) {
    await updateEmail(user, newEmail)
  }
  static async updateData(user: FirebaseUser, updates: IUserUpdates) {
    if(updates.email){
      await updateEmail(user, updates.email)
    }
    await updateProfile(user, {photoURL: updates.photoURL || user.photoURL, displayName: updates.displayName || user.displayName})
  }
  static async updatePassword(user: FirebaseUser, newPassword: string) {
    await updatePassword(user, newPassword)
  }
}
