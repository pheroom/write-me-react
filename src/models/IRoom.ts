export interface IRoom{
  roomId: string
  authorId: string
  participants: IParticipant
  title: string
  createdAt: number
  isPrivate: boolean
  avatarURL: string | null
  isDialog: boolean
  description: string
  applications: string[]
  blockedList: string[]
}

export interface IParticipant{
  [uid: string]: ParticipantStatuses
}

export enum ParticipantStatuses{
  HOST = 'host',
  COMMON = 'common',
  ADMIN = 'admin',
}

