import {User as FirebaseUser } from '@firebase/auth';
import {IUser} from "../models/IUser";

export function getUserByFirebaseObject(user: FirebaseUser): IUser{
  // @ts-ignore
  let {displayName, email, emailVerified, isAnonymous, photoUrl, uid, metadata: {createdAt}, phoneNumber} = user
  photoUrl = photoUrl || null
  phoneNumber = phoneNumber || null
  return {displayName, email, emailVerified, isAnonymous, photoUrl, uid, createdAt, phoneNumber}
}