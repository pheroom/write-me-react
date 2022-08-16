import React, {FC, useEffect, useState} from 'react';
import {IRoom, ParticipantStatuses} from "../models/IRoom";
import Error from "../UI/Error";
import {messagesObserver} from "../firebaseAPI/messagesObserver";
import {IMessage} from "../models/IMessage";
import {useAppDispatch} from "../store";
import {addMessage, removeParticipant} from "../store/RoomReducers/RoomActionCreators";
import {roomSlice} from "../store/RoomReducers/RoomSlice";
import Messages from "./Messages";
import JoinToRoom from "./JoinToRoom";
import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../router";
import {roomObserver} from "../firebaseAPI/roomObserver";
import Loader from "../UI/Loader";

interface RoomProps {
  room: IRoom
  removeRoom: (roomId: string) => void
  isLoading: boolean
  error: string
  messages: IMessage[] | null
  uid: string
  infoVisible: boolean
  setInfoVisible: (status: boolean) => void
  className: string
}

const Room: FC<RoomProps> = ({className, uid, room, removeRoom, messages, isLoading, error, setInfoVisible, infoVisible}) => {
  const [text, setText] = useState('')

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const {setMessages, setRoom} = roomSlice.actions

  useEffect(()=>{
    const unsubscribeMessages = messagesObserver(room.roomId, messages, messagesUpdateHandle)
    const unsubscribeInfo = roomObserver(room.roomId, room, roomUpdateHandle)
    return () => {
      unsubscribeMessages()
      unsubscribeInfo()
    }
  },[room.roomId])

  function messagesUpdateHandle(newMessages: IMessage[] | null){
    dispatch(setMessages(newMessages))
  }

  function roomUpdateHandle(newRoom: IRoom | null){
    dispatch(setRoom(newRoom))
  }

  //todo
  function removeRoomHandle() {
    removeRoom(room.roomId)
  }

  function sendMessage(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    dispatch(addMessage({text, authorId: uid, roomId: room.roomId}))
  }

  function leaveRoom(){
    dispatch(removeParticipant({roomId: room.roomId, uid: uid}))
    navigate(RouteNames.FEED)
  }

  function copyInviteLink(){
    navigator.clipboard.writeText(window.location.href)
  }

  if(!room.participants[uid]) return <JoinToRoom room={room} uid={uid}/>
  if(isLoading) return <Loader/>
  return (
    <div className={'current-room ' + className}>
      <div onClick={e => setInfoVisible(true)} style={{border: '2px solid orange'}}>
        {room.avatarURL ? <img src={room.avatarURL} alt={'room avatar'}/> : "Фотография не установлена"}
        <br/>
        {room.title}
        <br/>
        <div>{Object.entries(room.participants).length} подписчиков</div>
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
          <button onClick={copyInviteLink}>copy invite link</button>
          {room.participants[uid] === ParticipantStatuses.HOST
            ? <Link to={RouteNames.EDIT_ROOM + '/' + room.roomId}>Редактировать комнату</Link>
            : <button onClick={leaveRoom}>Отписаться</button>
          }
          <button onClick={e => setInfoVisible(false)}>Скрыть информацию</button>
        </div>
        : <div>
          <Messages messages={messages} uid={uid}/>
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

//<div style={{border: '2px solid teal'}}>
//             <h4>Учасстники:</h4>
//             {Object.entries(room.participants).map(([pid, status]) =>
//               <div key={pid}>
//                 <UserLink uid={pid}/>: {status}
//               </div>
//             )}
//           </div>