import React, {FC} from 'react';
import {IRoom} from "../models/IRoom";
import {useAppDispatch} from "../store";
import {addApplication, addParticipant} from "../store/RoomReducers/RoomActionCreators";
import Error from "../UI/Errors/Error";
import ButtonMedium from "../UI/ButtonsBase/ButtonMedium";
import Button from "../UI/ButtonsBase/Button";

interface JoinToRoomProps {
  room: IRoom
  uid: string
}

const JoinToRoom = React.forwardRef(({room, uid}: JoinToRoomProps, ref: React.ForwardedRef<HTMLDivElement>) => {

  const dispatch = useAppDispatch()

  function joinHandle(){
    dispatch(addParticipant({roomId: room.roomId, uid}))
  }

  function submitApplication(){
    dispatch(addApplication({roomId: room.roomId, aid: uid}))
  }

  if(!room) return <Error>{'room don`t find'}</Error>
  return (
    <div ref={ref} className={'feed__room jointo'}>
      {room.isPrivate
        ? <div className={'jointo__main'}>

          <div className="jointo__title">
            <p>Вы хотите вступить в приватную группу:</p><p className={'jointo__room-title'}>{room.title}</p>
          </div>
          {room.applications && room.applications.includes(uid)
            ? <Button disabled={true} onClick={() => console.log(': )')}>Заявка подана!</Button>
            : <Button onClick={submitApplication}>Подать заявку</Button>
          }
        </div>
        : <div className={'jointo__main'}>
          <div className="jointo__title">
            <p>Вы хотите вступить в группу:</p><p className={'jointo__room-title'}>{room.title}</p>
          </div>
          <Button onClick={joinHandle}>Присоединиться</Button>
        </div>
      }
    </div>
  );
})

export default JoinToRoom;