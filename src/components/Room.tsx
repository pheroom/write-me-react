import React, {FC, useEffect, useState} from 'react';
import {IRoom, ParticipantStatuses} from "../models/IRoom";
import Error from "../UI/Error";
import {messagesObserver} from "../firebaseAPI/messagesObserver";
import {IMessage} from "../models/IMessage";
import {useAppDispatch} from "../store";
import {useSelectorRoom} from "../hooks/redux";
import {addMessage} from "../store/RoomReducers/RoomActionCreators";
import {roomSlice} from "../store/RoomReducers/RoomSlice";
import Messages from "./Messages";
import JoinToRoom from "./JoinToRoom";
import UserLink from "./UserLink";
import {Link} from "react-router-dom";
import {RouteNames} from "../router";

interface RoomProps {
  room: IRoom
  removeRoom: (roomId: string) => void
  isLoading: boolean
  error: string
  messages: IMessage[] | null
  uid: string
}

const Room: FC<RoomProps> = ({uid, room, removeRoom, messages, isLoading, error}) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const [text, setText] = useState('')

  const dispatch = useAppDispatch()
  let {roomData, isRoomLoading, roomError} = useSelectorRoom()
  const {setMessages} = roomSlice.actions

  useEffect(()=>{
    const unsubscribe = messagesObserver(room.roomId, messages, messagesUpdateHandle)
    return unsubscribe
  },[messages])

  function messagesUpdateHandle(newMessages: IMessage[] | null){
    dispatch(setMessages(newMessages))
  }

  function removeRoomHandle() {
    removeRoom(room.roomId)
  }

  function sendMessage(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    dispatch(addMessage({text, authorId: uid, roomId: room.roomId}))
  }

  if(!room.participants[uid]) return <JoinToRoom room={room} uid={uid}/>
  return (
    <div>
      <div onClick={e => setInfoVisible(true)} style={{border: '2px solid orange'}}>
        {room.avatarURL ? <img src={room.avatarURL} alt={'room avatar'}/> : "Фотография не установлена"}
        <br/>
        {room.title}
      </div>
      {error && <Error message={error}/>}
      {infoVisible
        ? <div>
          {room.authorId}
          <br/>
          {(new Date(room.createdAt)).toString()}
          <br/>
          {room.isPrivate ? "Это приватная комната" : "Это публичная комната"}
          <br/>
          <div style={{border: '2px solid teal'}}>
            <h4>Учасстники:</h4>
            {Object.entries(room.participants).map(([pid, status]) =>
              <div key={pid}>
                <UserLink uid={pid}/>: {status}
              </div>
            )}
          </div>
          {room.participants[uid] === ParticipantStatuses.HOST && <Link to={RouteNames.EDIT_ROOM}>Редактировать комнату</Link>}
          <button onClick={removeRoomHandle}>Удалить комнату</button>
          <button onClick={e => setInfoVisible(false)}>Скрыть информацию</button>
        </div>
        : <div>
          <Messages messages={roomData.messages} uid={uid}/>
          <form onSubmit={sendMessage}>
            <input type="text" value={text} onChange={e => setText(e.target.value)}/>
            <button type={'submit'}>send</button>
          </form>
        </div>
      }
    </div>
  );
};

export default Room;

//{roomId, authorId, participants, title, createdAt, isPrivate, avatarURL}