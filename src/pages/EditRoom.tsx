import React, {useEffect} from 'react';
import {useSelectorRoom, useSelectorUser} from "../hooks/redux";
import Loader from "../UI/Loader";
import Error from "../UI/Error";
import UserLink from "../components/UserLink";
import {IRoom, ParticipantStatuses} from "../models/IRoom";
import {useAppDispatch} from "../store";
import {
  acceptApplication,
  blockUser,
  rejectApplication,
  unblockUser,
  updateParticipant
} from "../store/RoomReducers/RoomActionCreators";
import {useParams} from "react-router-dom";
import {roomSlice} from "../store/RoomReducers/RoomSlice";
import {roomObserver} from "../firebaseAPI/roomObserver";

const EditRoom = () => {
  const {roomData, roomError, isRoomLoading} = useSelectorRoom()
  const room = roomData.room

  const {roomId} = useParams()

  const dispatch = useAppDispatch()
  const {userData} = useSelectorUser()
  const {setRoom} = roomSlice.actions

  useEffect(()=>{
    if(room && room.roomId){
      const unsubscribeInfo = roomObserver(room.roomId, room, roomUpdateHandle)
      return () => {
        unsubscribeInfo()
      }
    }
  },[room?.roomId])

  function roomUpdateHandle(newRoom: IRoom | null){
    dispatch(setRoom(newRoom))
  }

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

  function blockUserHandle(pid: string){
    if(userData && roomId){
      dispatch(blockUser({roomId, uid: userData.uid, blockedUid: pid}))
    }
  }

  function unblockUserHandle(bid: string){
    if(userData && roomId){
      dispatch(unblockUser({roomId, uid: userData.uid, blockedUid: bid}))
    }
  }

  function acceptApplicationHandle(aid: string){
    if(userData && roomId){
      dispatch(acceptApplication({roomId, uid: userData.uid, aid}))
    }
  }

  function rejectApplicationHandle(aid: string){
    if(userData && roomId){
      dispatch(rejectApplication({roomId, uid: userData.uid, aid}))
    }
  }

  function rejectAndBlockApplicationHandle(aid: string){
    rejectApplicationHandle(aid)
    blockUserHandle(aid)
  }

  if(!room || room.roomId !== roomId) return <Error>Комната не найдена</Error>
  if(room.participants[userData?.uid as string] !== ParticipantStatuses.HOST) return <Error>Вы не можете редактировать это комнату</Error>
  if(isRoomLoading) return <Loader/>
  return (
    <div>
      {room.title}
      <h3>Заявки</h3>
      {room.applications && room.applications.map(aid =>
        <div key={aid} style={{border: '1px solid gray'}}>
          {aid}
          <button onClick={e => acceptApplicationHandle(aid)}>accept</button>
          <button onClick={e => rejectApplicationHandle(aid)}>reject</button>
          <button onClick={e => rejectAndBlockApplicationHandle(aid)}>reject and block</button>
        </div>
      )}
      <h3>Заблокированны</h3>
      {room.blockedList && room.blockedList.map(bid =>
        <div key={bid} style={{border: '1px solid black'}}>
          {bid}
          <button onClick={e => unblockUserHandle(bid)}>unblock</button>
        </div>
      )}
      <h3>Подписчики</h3>
      {Object.entries(room.participants).map(([pid, status]) =>
        <div key={pid}>
          <UserLink uid={pid}/>:
          {status === ParticipantStatuses.ADMIN || status === ParticipantStatuses.HOST
            ? status === ParticipantStatuses.HOST
              ? <button>host</button>
              : <button onClick={e => removeAdminStatusHandle(pid)}>admin</button>
            : <button onClick={e => addAdminStatusHandle(pid)}>no admin</button>
          }
          {status !== ParticipantStatuses.HOST && <button onClick={e => blockUserHandle(pid)}>Заблокировать</button>}
        </div>
      )}
    </div>
  );
};

export default EditRoom;