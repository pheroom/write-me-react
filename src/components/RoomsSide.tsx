import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {IRoom} from "../models/IRoom";
import Loader from "../UI/Loader";
import Error from "../UI/Error";

interface RoomsSideProps {
  rooms: IRoom[] | null
  isLoading: boolean
  error: string
}

const RoomsSide: FC<RoomsSideProps> = ({rooms, isLoading, error}) => {
  if (isLoading) return <Loader/>
  return (
    <div>
      {error && <Error message={error}/>}
      {rooms
        ? rooms.map(room =>
          <Link to={room.roomId} key={room.roomId}>
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