import React, {createRef, FC, useEffect, useState} from 'react';
import {IRoom, ParticipantStatuses} from "../models/IRoom";
import Error from "../UI/Errors/Error";
import {messagesObserver} from "../firebaseAPI/messagesObserver";
import {IMessage} from "../models/IMessage";
import {useAppDispatch} from "../store";
import {
  acceptApplication,
  addMessage,
  blockUser, rejectApplication,
  removeParticipant, unblockUser,
  updateParticipant,
  updateRoom
} from "../store/RoomReducers/RoomActionCreators";
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
import UserInfoModal from "./ModalApplied/UserInfoModal";
import BlockedRoom from "./BlockedRoom";

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
  showProfile: (id: string) => void
}

const Room = React.forwardRef(({
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
                               infoVisible,
                               showProfile
                             }: RoomProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const [text, setText] = useState('')

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [screenScrolled, setScreenScrolled] = useState(true)

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
    dispatch(removeParticipant({roomId: room.roomId, pid: uid}))
    navigate(RouteNames.FEED)
  }

  function changeHandle(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
  }

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
  }

  function removeAdminStatusHandle(pid: string){
    dispatch(updateParticipant({roomId: room.roomId, uid, pid, status: ParticipantStatuses.COMMON}))
  }

  function addAdminStatusHandle(pid: string){
    dispatch(updateParticipant({roomId: room.roomId, uid, pid, status: ParticipantStatuses.ADMIN}))
  }

  function removeUserHandle(pid: string){
    dispatch(removeParticipant({roomId: room.roomId, pid}))
  }

  function blockUserHandle(pid: string){
    dispatch(blockUser({roomId: room.roomId, uid, blockedUid: pid}))
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

  if (room.blockedList && room.blockedList.includes(uid)) return <BlockedRoom ref={ref}/>
  if (!room.participants[uid]) return <JoinToRoom room={room} uid={uid} ref={ref}/>
  return (
    <div className={'current-room ' + className} ref={ref}>

      {infoVisible && <RoomInfoModal editRoomLink={() => setEditVisible(true)}
                                     isOwner={room.participants[uid] === ParticipantStatuses.HOST} leaveRoom={leaveRoom}
                                     room={room} closeModal={() => setInfoVisible(false)}/>}
      {editVisible &&
        <EditRoomModal removeRoom={removeRoomHandle} closeModal={() => setEditVisible(false)} updateRoom={updateRoomHandle} room={room}
                       resetError={resetError} acceptApplication={acceptApplicationHandle} addAdminStatus={addAdminStatusHandle}
                       blockUser={blockUserHandle} rejectAndBlockApplication={rejectAndBlockApplicationHandle}
                       rejectApplication={rejectApplicationHandle} removeAdminStatus={removeAdminStatusHandle}
                       unblockUser={unblockUserHandle} removeUser={removeUserHandle}/>}

      <div className={'current-room__header'} onClick={e => setInfoVisible(true)}>
        <h5 className={'current-room__title'}>{room.title}</h5>
        <div className={'current-room__count-participants'}>{Object.entries(room.participants).length} подписчиков</div>
      </div>
      {error && <Error close={resetError}>{error}</Error>}
      <Messages showProfile={showProfile} scrollToBottom={scrollToBottom} screenScrolled={screenScrolled} setScreenScrolled={setScreenScrolled}
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
})

export default Room;
