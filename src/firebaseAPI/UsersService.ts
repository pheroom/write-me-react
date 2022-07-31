import {getDatabase, ref, child, get, set} from "firebase/database";
import {IUser} from "../models/IUser";

export default class UsersService {
  static async addNewUser(user: IUser) {
    set(ref(getDatabase(), 'users/' + user.uid), user)
  }
  static async getUser(uid: string) {
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    })
  }
}
