import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../store";
import {createRoom, getAllRooms, removeRoom} from "../store/RoomsReducers/RoomsActionCreators";
import {useSelectorRooms, useSelectorUser, useSelectorRoom} from "../hooks/redux";
import {IUser} from "../models/IUser";
import {useNavigate, useParams} from "react-router-dom";
import RoomsSide from "./RoomsSide";
import CreateRoom from "./CreateRoom";
import {IRoom} from "../models/IRoom";
import Room from "./Room";
import {roomsObserver} from "../firebaseAPI/roomsObserver";
import {roomsSlice} from "../store/RoomsReducers/RoomsSlice";
import {roomSlice} from "../store/RoomReducers/RoomSlice";
import {getMessages, getRoomById} from "../store/RoomReducers/RoomActionCreators";
import {RouteNames} from "../router";

const Chat = () => {
  const {roomId} = useParams()

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  let {userData, isUserLoading, userError} = useSelectorUser()
  const user = userData as IUser
  let {roomsData, roomsError, isRoomsLoading} = useSelectorRooms()
  let {roomData, isRoomLoading, roomError} = useSelectorRoom()
  const room = roomData.room
  const messages = roomData.messages

  const {setRooms} = roomsSlice.actions
  const {setRoom, setMessages} = roomSlice.actions

  useEffect(()=>{
    const unsubscribe = roomsObserver(roomsData, roomsUpdateHandle)
    return unsubscribe
  },[roomsData])

  useEffect(()=>{
    if(roomId){
      dispatch(getRoomById(roomId))
      dispatch(getMessages(roomId))
    } else{
      dispatch(setRoom(null))
      dispatch(setMessages(null))
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
    <div>
      <h2>Создать комнату:</h2>
      <CreateRoom createRoom={createRoomHandle}/>
      <br/>
      <h2>Комнаты:</h2>
      <RoomsSide rooms={roomsData} error={roomsError} isLoading={isRoomsLoading}/>
      <br/>
      {room && <Room uid={user.uid} room={room} messages={messages} removeRoom={removeRoomHandle} isLoading={isRoomLoading} error={roomError}/>}
      <br/>
    </div>
  );
};

export default Chat;