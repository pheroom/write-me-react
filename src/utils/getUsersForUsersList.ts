import {ParticipantStatuses} from "../models/IRoom";

export function getUsersForUsersList(users: object | null | undefined) {
  if(!users)
    return []
  if(users instanceof Array)
    return users.map((uid) => {
      return {uid}
    })
  return Object.entries(users).map(([uid, userStatus]) => {
    const status = userStatus === ParticipantStatuses.HOST ? 'владелец' : userStatus === ParticipantStatuses.ADMIN && 'админ'
    return status ? {uid, status} : {uid}
  })
}