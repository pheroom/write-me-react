import React, {FC} from 'react';
import {IRoom} from "../models/IRoom";
import {useAppDispatch} from "../store";
import {useSelectorRoom} from "../hooks/redux";
import {roomSlice} from "../store/RoomReducers/RoomSlice";
import {addApplication, addParticipant} from "../store/RoomReducers/RoomActionCreators";

interface JoinToRoomProps {
  room: IRoom
  uid: string
}

const JoinToRoom: FC<JoinToRoomProps> = ({room, uid}) => {

  const dispatch = useAppDispatch()

  function joinHandle(){
    dispatch(addParticipant({roomId: room.roomId, uid}))
  }

  function submitApplication(){
    dispatch(addApplication({roomId: room.roomId, uid}))
  }

  return (
    <div>
      {room.isPrivate
        ? <div>
          <h3>{room.title}</h3>
          <h4>Вы хотите вступить в приватную группу</h4>
          <button onClick={submitApplication}>Подать заявку</button>
        </div>
        : <div>
          <h3>{room.title}</h3>
          <button onClick={joinHandle}>Присоедениться</button>
        </div>
      }
    </div>
  );
};

export default JoinToRoom;