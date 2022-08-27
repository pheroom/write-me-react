import React, {createRef, FC, useEffect, useState} from 'react';
import {IRoom, ParticipantStatuses} from "../models/IRoom";
import Error from "../UI/Error";
import {messagesObserver} from "../firebaseAPI/messagesObserver";
import {IMessage} from "../models/IMessage";
import {useAppDispatch} from "../store";
import {addMessage, removeParticipant, updateRoom} from "../store/RoomReducers/RoomActionCreators";
import {roomSlice} from "../store/RoomReducers/RoomSlice";
import Messages from "./Messages";
import JoinToRoom from "./JoinToRoom";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../router";
import {roomObserver} from "../firebaseAPI/roomObserver";
import sendActIcon from '../assets/icons/send-active.png'
import sendDisIcon from '../assets/icons/send-disabled.png'
import RoomInfoModal from "./ModalApplied/RoomInfoModal";
import EditRoomModal from "./ModalApplied/EditRoomModal";
import {IRoomUpdates} from "../models/IRoomUpdates";

interface RoomProps {
  room: IRoom
  removeRoom: (roomId: string) => void
  isLoading: boolean
  error: string
  messages: IMessage[] | null
  uid: string
  infoVisible: boolean
  setInfoVisible: (status: boolean) => void
  editVisible: boolean
  setEditVisible: (status: boolean) => void
  className: string
  resetError: () => void
}

const Room: FC<RoomProps> = ({
                               className,
                               uid,
                               room,
                               resetError,
                               removeRoom,
                               messages,
                               isLoading,
                               editVisible,
                               setEditVisible,
                               error,
                               setInfoVisible,
                               infoVisible
                             }) => {
  const [text, setText] = useState('')

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  // const {setMessages, setRoom} = roomSlice.actions
  //
  // useEffect(() => {
  //   const unsubscribeMessages = messagesObserver(room.roomId, messages, messagesUpdateHandle)
  //   const unsubscribeInfo = roomObserver(room.roomId, room, roomUpdateHandle)
  //   return () => {
  //     unsubscribeMessages()
  //     unsubscribeInfo()
  //   }
  // }, [room.roomId])
  //
  // function messagesUpdateHandle(newMessages: IMessage[] | null) {
  //   dispatch(setMessages(newMessages))
  // }
  //
  // function roomUpdateHandle(newRoom: IRoom | null) {
  //   dispatch(setRoom(newRoom))
  // }

  //todo
  function removeRoomHandle() {
    removeRoom(room.roomId)
  }

  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(addMessage({text, authorId: uid, roomId: room.roomId}))
    setText('')
    // scrollToBottom()
  }

  function leaveRoom() {
    dispatch(removeParticipant({roomId: room.roomId, uid: uid}))
    navigate(RouteNames.FEED)
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

  function updateRoomHandle(updates: IRoomUpdates) {
    dispatch(updateRoom({room, updates}))
    console.log(updates)
  }

  if (!room.participants[uid]) return <JoinToRoom room={room} uid={uid}/>
  return (
    <div className={'current-room ' + className}>

      {infoVisible && <RoomInfoModal editRoomLink={() => setEditVisible(true)}
                                     isOwner={room.participants[uid] === ParticipantStatuses.HOST} leaveRoom={leaveRoom}
                                     room={room} closeModal={() => setInfoVisible(false)}/>}
      {editVisible &&
        <EditRoomModal removeRoom={removeRoomHandle} closeModal={() => setEditVisible(false)} updateRoom={updateRoomHandle} room={room}
                       resetError={resetError}/>}

      <div className={'current-room__header'} onClick={e => setInfoVisible(true)}>
        <h5 className={'current-room__title'}>{room.title}</h5>
        <div className={'current-room__count-participants'}>{Object.entries(room.participants).length} подписчиков</div>
      </div>
      {error && <Error>{error}</Error>}
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
