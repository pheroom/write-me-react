import {IUser} from "../models/IUser";
import {IFirebaseUser} from "../models/IFirebaseUser";
import {User as FirebaseUser } from '@firebase/auth';

export function getUserByFirebaseObject(user: IFirebaseUser | FirebaseUser): IUser{
  // @ts-ignore
  let {displayName, email, emailVerified, isAnonymous, photoURL, uid, metadata: {createdAt}, phoneNumber} = user as IFirebaseUser
  photoURL = photoURL || null
  phoneNumber = phoneNumber || null
  let descriptions = null
  return {displayName, email, emailVerified, isAnonymous, photoURL, uid, createdAt, phoneNumber, descriptions}
}