export interface IUser {
  uid: string,
  photoURL: string | null | undefined
  displayName: string
  email: string
  emailVerified: boolean
  isAnonymous: boolean
  createdAt: number
  phoneNumber: string | null
}