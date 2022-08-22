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

const FeedPage = () => {
  const [infoVisible, setInfoVisible] = useState(false)

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

  function createRoomHandle(title: string, isPrivate: boolean){
    dispatch(createRoom({title, isPrivate, authorId: user.uid}))
  }

  function removeRoomHandle(roomId: string){
    dispatch(removeRoom({roomId, uid: user.uid}))
    navigate(RouteNames.FEED)
  }

  return (
    <main className={'feed'}>
      {userData && <SideMenu user={userData} createRoom={createRoomHandle}/>}
      <RoomsSide className={'feed__side'} currentRoom={roomData.room} rooms={roomsData} error={roomsError} isLoading={isRoomsLoading}/>
      {room
        ? <Room className={'feed__room'} infoVisible={infoVisible} setInfoVisible={setInfoVisible} uid={user.uid} room={room} messages={messages} removeRoom={removeRoomHandle} isLoading={isRoomLoading} error={roomError}/>
        : <div className={'feed__room'}>Комната не выбрана</div>
      }
      <br/>
    </main>
  );
};

export default FeedPage;