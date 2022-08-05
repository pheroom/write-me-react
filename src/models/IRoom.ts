export interface IRoom{
  roomId: string
  authorId: string
  participants: IParticipant[]
  title: string
  createdAt: number
  isPrivate: boolean
  avatarURL: string | null
  isDialog: boolean
}

export interface IParticipant{
  uid: string,
  status: ParticipantStatuses
}

export enum ParticipantStatuses{
  HOST = 'host',
  COMMON = 'common',
  ADMIN = 'admin',
}

