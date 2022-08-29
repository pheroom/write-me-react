import React, {FC} from 'react';
import {
  acceptApplication,
  blockUser,
  rejectApplication,
  unblockUser,
  updateParticipant, updateRoom
} from "../store/RoomReducers/RoomActionCreators";
import {IRoom, ParticipantStatuses} from "../models/IRoom";
import EditRoomModal from "./ModalApplied/EditRoomModal";
import {removeRoom} from "../store/RoomsReducers/RoomsActionCreators";
import {RouteNames} from "../router";
import {IRoomUpdates} from "../models/IRoomUpdates";
import {useAppDispatch} from "../store";
import {useNavigate} from "react-router-dom";
import {roomSlice} from "../store/RoomReducers/RoomSlice";

interface EditRoomModalStoredProps{
  closeModal: () => void
  room: IRoom
  uid: string
}

const EditRoomModalStored: FC<EditRoomModalStoredProps> = ({closeModal, room, uid}) => {

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const {resetError} = roomSlice.actions

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
    dispatch(blockUser({roomId: room.roomId, uid: uid, blockedUid: pid}))
  }

  function unblockUserHandle(bid: string){
    dispatch(unblockUser({roomId: room.roomId, uid, blockedUid: bid}))
  }

  function acceptApplicationHandle(aid: string){
    dispatch(acceptApplication({roomId: room.roomId, uid, aid}))
  }

  function rejectApplicationHandle(aid: string){
    dispatch(rejectApplication({roomId: room.roomId, uid, aid}))
  }

  function rejectAndBlockApplicationHandle(aid: string){
    rejectApplicationHandle(aid)
    blockUserHandle(aid)
  }

  function removeRoomHandle() {
    dispatch(removeRoom({roomId: room.roomId, uid}))
    navigate(RouteNames.FEED)
  }

  function updateRoomHandle(updates: IRoomUpdates) {
    dispatch(updateRoom({room, updates}))
  }

  return (
    <EditRoomModal removeRoom={removeRoomHandle} closeModal={closeModal} updateRoom={updateRoomHandle} room={room}
                   resetError={resetError}/>
  );
};

export default EditRoomModalStored;