import React, {FC, useContext} from 'react';
import {Link} from "react-router-dom";
import {IRoom} from "../models/IRoom";
import Loader from "../UI/Loader";
import Error from "../UI/Error";
import BurgerMenu from "../UI/BurgerMenu";
import {menuVisibleContext} from "../App";

interface RoomsSideProps {
  rooms: IRoom[] | null
  isLoading: boolean
  error: string
}

const RoomsSide: FC<RoomsSideProps> = ({rooms, isLoading, error}) => {
  const {status, change} = useContext(menuVisibleContext)

  if (isLoading) return <Loader/>
  return (
    <div className={'rooms-side'}>
      {error && <Error message={error}/>}
      <BurgerMenu status={status} change={change}/>
      {rooms
        ? rooms.map(room =>
          <Link className={'rooms-side__room'} to={room.roomId} key={room.roomId}>
            {room.avatarURL && <img src={room.avatarURL} alt="avatar"/>}
            <h3>{room.title}</h3>
          </Link>
        )
        : <h4>Комнат пока нет</h4>
      }
    </div>
  );
};

export default RoomsSide;