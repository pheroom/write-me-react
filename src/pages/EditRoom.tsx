import React from 'react';
import {useSelectorRoom, useSelectorUser} from "../hooks/redux";
import Loader from "../UI/Loader";
import Error from "../UI/Error";
import UserLink from "../components/UserLink";
import {ParticipantStatuses} from "../models/IRoom";
import {useAppDispatch} from "../store";
import {updateParticipant} from "../store/RoomReducers/RoomActionCreators";

const EditRoom = () => {
  const {roomData, roomError, isRoomLoading} = useSelectorRoom()
  const room = roomData.room

  const dispatch = useAppDispatch()
  const {userData} = useSelectorUser()

  function removeAdminStatusHandle(pid: string){
    if(window.confirm('Забрать роль администратора у этого пользователя?') && room){
      dispatch(updateParticipant({roomId: room.roomId, uid: pid, status: ParticipantStatuses.COMMON}))
    }
  }

  function addAdminStatusHandle(pid: string){
    if(window.confirm('Сделать админом этого пользователя?') && room){
      dispatch(updateParticipant({roomId: room.roomId, uid: pid, status: ParticipantStatuses.ADMIN}))
    }
  }

  if(!room) return <Error message={'Комната не найдена'}/>
  if(isRoomLoading) return <Loader/>
  return (
    <div>
      {room.title}
      {Object.entries(room.participants).map(([pid, status]) =>
        <div key={pid}>
          <UserLink uid={pid}/>:
          {status === ParticipantStatuses.ADMIN || status === ParticipantStatuses.HOST
            ? status === ParticipantStatuses.HOST
              ? <button>host</button>
              : <button onClick={e => removeAdminStatusHandle(pid)}>admin</button>
            : <button onClick={e => addAdminStatusHandle(pid)}>no admin</button>
          }
        </div>
      )}
    </div>
  );
};

export default EditRoom;