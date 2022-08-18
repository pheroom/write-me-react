import React, {createRef, FC, useEffect, useState} from 'react';
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
import sendActIcon from '../assets/icons/send-active.png'
import sendDisIcon from '../assets/icons/send-disabled.png'
import {useObserverVisible} from "../hooks/useObserverVisible";
import Modal from "../UI/Modal";

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

const Room: FC<RoomProps> = ({
                               className,
                               uid,
                               room,
                               removeRoom,
                               messages,
                               isLoading,
                               error,
                               setInfoVisible,
                               infoVisible
                             }) => {
  const [text, setText] = useState('')

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const {setMessages, setRoom} = roomSlice.actions

  useEffect(() => {
    const unsubscribeMessages = messagesObserver(room.roomId, messages, messagesUpdateHandle)
    const unsubscribeInfo = roomObserver(room.roomId, room, roomUpdateHandle)
    return () => {
      unsubscribeMessages()
      unsubscribeInfo()
    }
  }, [room.roomId])

  function messagesUpdateHandle(newMessages: IMessage[] | null) {
    dispatch(setMessages(newMessages))
  }

  function roomUpdateHandle(newRoom: IRoom | null) {
    dispatch(setRoom(newRoom))
  }

  //todo
  function removeRoomHandle() {
    removeRoom(room.roomId)
  }

  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(addMessage({text, authorId: uid, roomId: room.roomId}))
    setText('')
    scrollToBottom()
  }

  function leaveRoom() {
    dispatch(removeParticipant({roomId: room.roomId, uid: uid}))
    navigate(RouteNames.FEED)
  }

  function copyInviteLink() {
    navigator.clipboard.writeText(window.location.href)
  }

  function changeHandle(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
  }

  const [screenScrolled, setScreenScrolled] = useState(true)

  function scrollToBottom() {
    setScreenScrolled(false)
    if (messagesRef.current) {
      messagesRef.current.scroll({top: messagesRef.current.scrollHeight, behavior: 'smooth'})
    }
  }

  const textareaRef = createRef<HTMLTextAreaElement>()
  const messagesRef = createRef<HTMLDivElement>()
  const formRef = createRef<HTMLFormElement>()
  const toBotBtnRef = createRef<HTMLDivElement>()

  React.useLayoutEffect(() => {
    if (textareaRef.current && messagesRef.current && formRef.current) {
      textareaRef.current.style.height = "13px";
      let newTextAreaHeight = Math.min(textareaRef.current.scrollHeight, 300 - 20)
      textareaRef.current.style.height = `${newTextAreaHeight}px`;
      messagesRef.current.style.maxHeight = `${window.innerHeight - 54 - formRef.current.scrollHeight}px`
      if (toBotBtnRef.current) {
        toBotBtnRef.current.style.bottom = `${formRef.current.scrollHeight + 20}px`
      }
    }
  }, [text]);

  if (!room.participants[uid]) return <JoinToRoom room={room} uid={uid}/>
  return (
    <div className={'current-room ' + className}>
      <div className={'current-room__header'} onClick={e => setInfoVisible(true)}>
        <h5 className={'current-room__title'}>{room.title}</h5>
        <div className={'current-room__count-participants'}>{Object.entries(room.participants).length} подписчиков</div>
      </div>
      {infoVisible && <Modal title={'Channel Info'} closeModal={() => setInfoVisible(false)}/>}
      {error && <Error message={error}/>}
      <Messages scrollToBottom={scrollToBottom} screenScrolled={screenScrolled} setScreenScrolled={setScreenScrolled}
                className={'current-room__main'} toBotBtnRef={toBotBtnRef} messagesRef={messagesRef} messages={messages}
                uid={uid}/>
      <form ref={formRef} onSubmit={sendMessage} className={'current-room__form'}>
            <textarea rows={1} ref={textareaRef} className={'current-room__input'} value={text} onChange={changeHandle}
                      placeholder={'Напишите что-нибудь...'}/>
        <button className={'current-room__send-btn'} type={'submit'} disabled={!text}>
          <img className={'current-room__send-img'} src={text ? sendActIcon : sendDisIcon} alt="send"/>
        </button>
      </form>
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


//{infoVisible
//         ? <div>
//           {room.authorId}
//           <br/>
//           {(new Date(room.createdAt)).toString()}
//           <br/>
//           {room.isPrivate ? "Это приватная комната" : "Это публичная комната"}
//           <br/>
//           <button onClick={copyInviteLink}>copy invite link</button>
//           {room.participants[uid] === ParticipantStatuses.HOST
//             ? <Link to={RouteNames.EDIT_ROOM + '/' + room.roomId}>Редактировать комнату</Link>
//             : <button onClick={leaveRoom}>Отписаться</button>
//           }
//           <button onClick={e => setInfoVisible(false)}>Скрыть информацию</button>
//         </div>
//         : <>
//           <Messages scrollToBottom={scrollToBottom} screenScrolled={screenScrolled}  setScreenScrolled={setScreenScrolled} className={'current-room__main'} toBotBtnRef={toBotBtnRef} messagesRef={messagesRef} messages={messages} uid={uid}/>
//           <form ref={formRef} onSubmit={sendMessage} className={'current-room__form'}>
//             <textarea rows={1} ref={textareaRef} className={'current-room__input'} value={text} onChange={changeHandle}
//                       placeholder={'Напишите что-нибудь...'}/>
//             <button className={'current-room__send-btn'} type={'submit'} disabled={!text}>
//               <img className={'current-room__send-img'} src={text ? sendActIcon : sendDisIcon} alt="send"/>
//             </button>
//           </form>
//         </>
//       }