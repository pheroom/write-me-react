import {User as FirebaseUser } from '@firebase/auth';

export interface IFirebaseUser extends FirebaseUser{
  displayName: string
  email: string
}