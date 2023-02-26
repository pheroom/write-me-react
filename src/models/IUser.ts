export interface IUser {
  uid: string,
  photoURL: string | null
  displayName: string
  email: string
  emailVerified: boolean
  isAnonymous: boolean
  createdAt: number
  phoneNumber: string | null
  descriptions: string | null
}