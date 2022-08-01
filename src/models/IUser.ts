export interface IUser {
  uid: string,
  photoUrl: string | null | undefined
  displayName: string | null
  email: string | null
  emailVerified: boolean
  isAnonymous: boolean
  createdAt: number
  phoneNumber: string | null
}