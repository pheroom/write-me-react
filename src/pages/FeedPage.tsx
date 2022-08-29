import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../store";
import {createRoom, getAllRooms, removeRoom} from "../store/RoomsReducers/RoomsActionCreators";
import {useSelectorRooms, useSelectorUser, useSelectorRoom} from "../hooks/redux";
import {IUser} from "../models/IUser";
import {useNavigate, useParams} from "react-router-dom";
import RoomsSide from "../components/RoomsSide";
import {IRoom, ParticipantStatuses} from "../models/IRoom";
import Room from "../components/Room";
import {roomsObserver} from "../firebaseAPI/roomsObserver";
import {roomsSlice} from "../store/RoomsReducers/RoomsSlice";
import {getRoomData} from "../store/RoomReducers/RoomActionCreators";
import {RouteNames} from "../router";
import SideMenu from "../components/SideMenu";
import CreateRoomModal from "../components/ModalApplied/CreateRoomModal";
import EditProfileModal from "../components/ModalApplied/EditProfileModal";
import Loader from "../UI/Loaders/Loader";
import {changePassword, signOut, updateUser} from "../store/UserReducers/UserActionCreators";
import {IUserUpdates} from "../models/IUserUpdates";
import {userSlice} from "../store/UserReducers/UserSlice";
import {roomSlice} from "../store/RoomReducers/RoomSlice";
import {messagesObserver} from "../firebaseAPI/messagesObserver";
import {roomObserver} from "../firebaseAPI/roomObserver";
import {IMessage} from "../models/IMessage";

const FeedPage = () => {
  const [infoRoomVisible, setInfoRoomVisible] = useState(false)
  const [editRoomVisible, setEditRoomVisible] = useState(false)
  const [createRoomVisible, setCreateRoomVisible] = useState(false)
  const [editProfileVisible, setEditProfileVisible] = useState(false)

  const {roomId} = useParams()

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  let {userData, userError} = useSelectorUser()
  const user = userData as IUser
  let {roomsData, roomsError, isRoomsLoading} = useSelectorRooms()
  let {roomData, isRoomLoading, roomError} = useSelectorRoom()
  const room = roomData.room
  const messages = roomData.messages

  const {setRooms} = roomsSlice.actions
  const {resetError: resetErrorUser} = userSlice.actions
  const {resetError: resetErrorRoom} = roomSlice.actions
  const {setMessages, setRoom} = roomSlice.actions

  useEffect(() => {
    const unsubscribe = roomsObserver(roomsData, roomsUpdateHandle)
    return unsubscribe
  }, [])

  useEffect(() => {
    setInfoRoomVisible(false)
    setEditRoomVisible(false)
    if (roomId) {
      const unsubscribeMessages = messagesObserver(roomId, messages, messagesUpdateHandle)
      const unsubscribeInfo = roomObserver(roomId, room, roomUpdateHandle)
      return () => {
        unsubscribeMessages()
        unsubscribeInfo()
      }
    }
  }, [roomId])

  function messagesUpdateHandle(newMessages: IMessage[] | null) {
    dispatch(setMessages(newMessages))
  }

  function roomUpdateHandle(newRoom: IRoom | null) {
    dispatch(setRoom(newRoom))
  }

  function resetUserError() {
    dispatch(resetErrorUser())
  }

  function resetRoomError() {
    dispatch(resetErrorRoom())
  }

  function roomsUpdateHandle(newRooms: IRoom[] | null) {
    dispatch(setRooms(newRooms))
  }

  function createRoomHandle(title: string, isPrivate: boolean, photoUrl: string | null) {
    dispatch(createRoom({title, isPrivate, authorId: user.uid, photoUrl}))
  }

  function removeRoomHandle(roomId: string) {
    dispatch(removeRoom({roomId, uid: user.uid}))
    navigate(RouteNames.FEED)
  }

  function logout() {
    dispatch(signOut())
  }

  function updateProfile(updates: IUserUpdates) {
    dispatch(updateUser(updates))
  }

  function changePasswordHandle(updates: { lastPas: string, newPas: string }) {
    dispatch(changePassword({password: updates.lastPas, newPassword: updates.newPas, email: user.email}))
  }

  function showEditRoom(status: boolean) {
    setInfoRoomVisible(false)
    if (room && (room.participants[user.uid] === ParticipantStatuses.HOST)) {
      setEditRoomVisible(status)
    }
  }

  return (
    <main className={'feed'}>
      {userData
        ? <SideMenu setCreateRoomVisible={setCreateRoomVisible} setEditProfileVisible={setEditProfileVisible}
                             user={userData} createRoom={createRoomHandle}/>
        : <Loader/>
      }

      {createRoomVisible &&
        <CreateRoomModal createRoom={createRoomHandle} closeModal={() => setCreateRoomVisible(false)}/>}
      {editProfileVisible &&
        <EditProfileModal changePassword={changePasswordHandle} resetError={resetUserError} error={userError}
                          logout={logout} updateProfile={updateProfile} user={user}
                          closeModal={() => setEditProfileVisible(false)}/>}

      <RoomsSide className={'feed__side'} currentRoom={room} rooms={roomsData} error={roomsError}
                 isLoading={isRoomsLoading}/>
      {room
        ? <Room editVisible={editRoomVisible} setEditVisible={showEditRoom} resetError={resetRoomError}
                className={'feed__room'} infoVisible={infoRoomVisible} setInfoVisible={setInfoRoomVisible}
                uid={user.uid}
                room={room} messages={messages} removeRoom={removeRoomHandle} isLoading={isRoomLoading}
                error={roomError}/>
        : <div className={'feed__room-absent'}>
          <p className={'feed__room-absent-text'}>Комната не выбрана</p>
        </div>
      }
      <br/>
    </main>
  );
};

export default FeedPage;

//userData
//      ? <main className={'feed'}>
//         {<SideMenu setCreateRoomVisible={setCreateRoomVisible} setEditProfileVisible={setEditProfileVisible} user={userData} createRoom={createRoomHandle}/>}
//         {createRoomVisible && <CreateRoomModal createRoom={createRoomHandle} closeModal={() => setCreateRoomVisible(false)}/>}
//         {editProfileVisible && <EditProfileModal error={userError} logout={logout} updateProfile={updateProfile} user={userData} closeModal={() => setEditProfileVisible(false)}/>}
//         <RoomsSide className={'feed__side'} currentRoom={roomData.room} rooms={roomsData} error={roomsError} isLoading={isRoomsLoading}/>
//         {room
//           ? <Room className={'feed__room'} infoVisible={infoVisible} setInfoVisible={setInfoVisible} uid={user.uid} room={room} messages={messages} removeRoom={removeRoomHandle} isLoading={isRoomLoading} error={roomError}/>
//           : <div className={'feed__room'}>Комната не выбрана</div>
//         }
//         <br/>
//       </main>
//       : <Loader/>