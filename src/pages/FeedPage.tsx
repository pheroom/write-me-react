import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../store";
import {createRoom, getAllRooms, removeRoom} from "../store/RoomsReducers/RoomsActionCreators";
import {useSelectorRooms, useSelectorUser, useSelectorRoom} from "../hooks/redux";
import {IUser} from "../models/IUser";
import {useNavigate, useParams} from "react-router-dom";
import RoomsSide from "../components/RoomsSide";
import CreateRoom from "../components/CreateRoom";
import {IRoom} from "../models/IRoom";
import Room from "../components/Room";
import {roomsObserver} from "../firebaseAPI/roomsObserver";
import {roomsSlice} from "../store/RoomsReducers/RoomsSlice";
import {getRoomData} from "../store/RoomReducers/RoomActionCreators";
import {RouteNames} from "../router";
import SideMenu from "../components/SideMenu";
import CreateRoomModal from "../components/ModalApplied/CreateRoomModal";
import EditProfileModal from "../components/ModalApplied/EditProfileModal";
import Loader from "../UI/Loader";
import {signOut, updateUser} from "../store/UserReducers/UserActionCreators";
import {IUserUpdates} from "../models/IUserUpdates";

const FeedPage = () => {
  const [infoVisible, setInfoVisible] = useState(false)
  const [createRoomVisible, setCreateRoomVisible] = useState(false)
  const [editProfileVisible, setEditProfileVisible] = useState(false)

  const {roomId} = useParams()

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  let {userData} = useSelectorUser()
  const user = userData as IUser
  let {roomsData, roomsError, isRoomsLoading} = useSelectorRooms()
  let {roomData, isRoomLoading, roomError} = useSelectorRoom()
  const room = roomData.room
  const messages = roomData.messages

  const {setRooms} = roomsSlice.actions

  useEffect(()=>{
    dispatch(getAllRooms())
    const unsubscribe = roomsObserver(roomsData, roomsUpdateHandle)
    return unsubscribe
  },[])

  useEffect(()=>{
    setInfoVisible(false)
    if(roomId){
      dispatch(getRoomData(roomId))
    } else{
      dispatch(getRoomData(null))
    }
  },[roomId])

  function roomsUpdateHandle(newRooms: IRoom[] | null){
    dispatch(setRooms(newRooms))
  }

  function createRoomHandle(title: string, isPrivate: boolean, photoUrl: string | null){
    dispatch(createRoom({title, isPrivate, authorId: user.uid, photoUrl}))
  }

  function removeRoomHandle(roomId: string){
    dispatch(removeRoom({roomId, uid: user.uid}))
    navigate(RouteNames.FEED)
  }

  function logout() {
    dispatch(signOut())
  }

  function updateProfile(updates: IUserUpdates){
    dispatch(updateUser(updates))
  }

  return (
    userData
     ? <main className={'feed'}>
        {<SideMenu setCreateRoomVisible={setCreateRoomVisible} setEditProfileVisible={setEditProfileVisible} user={userData} createRoom={createRoomHandle}/>}
        {createRoomVisible && <CreateRoomModal createRoom={createRoomHandle} closeModal={() => setCreateRoomVisible(false)}/>}
        {editProfileVisible && <EditProfileModal logout={logout} updateProfile={updateProfile} user={userData} closeModal={() => setEditProfileVisible(false)}/>}
        <RoomsSide className={'feed__side'} currentRoom={roomData.room} rooms={roomsData} error={roomsError} isLoading={isRoomsLoading}/>
        {room
          ? <Room className={'feed__room'} infoVisible={infoVisible} setInfoVisible={setInfoVisible} uid={user.uid} room={room} messages={messages} removeRoom={removeRoomHandle} isLoading={isRoomLoading} error={roomError}/>
          : <div className={'feed__room'}>Комната не выбрана</div>
        }
        <br/>
      </main>
      : <Loader/>
  );
};

export default FeedPage;