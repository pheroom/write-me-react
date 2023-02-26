import React, {FC} from 'react';
import Img from "../UI/Img";
import TitleUser from "../UI/Texts/TitleUser";
import {IRoom} from "../models/IRoom";
import roomIcon from '../assets/icons/group-base.png'
import {getLength} from "../utils/getLength";
import {getMembersLabel} from "../utils/getMembersLabel";

interface RoomPreviewBriefProps{
  room: IRoom
}

const RoomPreviewBrief: FC<RoomPreviewBriefProps> = ({room}) => {
  return (
    <div className="room-preview">
      <div className="room-preview__img-box">
        <Img
          alt={'room-ava'}
          className="room-preview__img"
          src={room.photoURL || roomIcon}
        />
      </div>
      <div className="room-preview__info">
        <TitleUser className="room-preview__title">
          {room.title}
        </TitleUser>
        <p className="room-preview__count-sub">{getLength(room.participants)} {getMembersLabel(getLength(room.participants))}</p>
      </div>
    </div>
  );
};

export default RoomPreviewBrief;