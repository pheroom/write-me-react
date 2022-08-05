import React, {FC} from 'react';
import {IRoom} from "../models/IRoom";

interface RoomProps{
  room: IRoom
}

const Room: FC<RoomProps> = ({room}) => {
  return (
    <div>
      {room.title}
      <br/>
      {room.authorId}
      <br/>
      {(new Date(room.createdAt)).toString()}
      <br/>
      {room.isPrivate ? "Это приватная комната" : "Это публичная комната"}
      <br/>
      {room.avatarURL ? <img src={room.avatarURL} alt={'room avatar'}/> : "Фотография не установлена"}
    </div>
  );
};

export default Room;

//{roomId, authorId, participants, title, createdAt, isPrivate, avatarURL}