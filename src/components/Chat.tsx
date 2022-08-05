import React, {FormEvent, useEffect, useState} from 'react';
import { getAuth, signOut } from "firebase/auth";
import {userSlice} from "../store/UserReducers/UserSlice";
import {useAppDispatch} from "../store";
import {createRoom, getAllRooms} from "../store/RoomsReducers/RoomsActionCreators";
import {useSelectorRooms, useSelectorUser} from "../hooks/redux";
import {IUser} from "../models/IUser";
import {Link, useParams} from "react-router-dom";
import RoomsSide from "./RoomsSide";
import CreateRoom from "./CreateRoom";
import {IRoom} from "../models/IRoom";
import RoomsService from "../firebaseAPI/RoomsService";
import Room from "./Room";

const Chat = () => {

  const [room, setRoom] = useState<null | IRoom>(null)

  const {roomId} = useParams()

  useEffect(()=>{
    dispatch(getAllRooms())
    if(roomId){
      RoomsService.getRoom(roomId).then(room => setRoom(room))
    }
  },[roomId])

  const dispatch = useAppDispatch()
  let {userData, isUserLoading, userError} = useSelectorUser()
  const user = userData as IUser
  let {roomsData, roomsError, isRoomsLoading} = useSelectorRooms()

  const {setUser} = userSlice.actions

  const [newRoom, setNewRoom] = useState({title: '', isPrivate: false})

  function createRoomHandle(title: string, isPrivate: boolean){
    dispatch(createRoom({title, isPrivate, authorId: user.uid}))
  }

  return (
    <div>
      <h2>Создать комнату:</h2>
      <CreateRoom createRoom={createRoomHandle}/>
      <br/>
      <h2>Комнаты:</h2>
      <RoomsSide rooms={roomsData} error={roomsError} isLoading={isRoomsLoading}/>
      <br/>
      {room && <Room room={room}/>}
      <br/>
    </div>
  );
};

export default Chat;