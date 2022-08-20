import React, {FC} from 'react';
import Img from "./Img";
import TitleUser from "./Texts/TitleUser";
import {IRoom} from "../models/IRoom";

interface RoomPreviewBriefProps{
  // room: IRoom
}

const RoomPreviewBrief: FC<RoomPreviewBriefProps> = ({}) => {
  return (
    <div className="room-preview">
      <div className="room-preview__img-box">
        <Img alt={'room-ava'} className="room-preview__img" src="https://cdn.ananasposter.ru/image/cache/catalog/poster/mult/95/2266-1000x830.jpg"/>
      </div>
      <div className="room-preview__info">
        <TitleUser className="room-preview__title">
          gpkdota
        </TitleUser>
        <p className="room-preview__count-sub">11 330 subscribers</p>
      </div>
    </div>
  );
};

export default RoomPreviewBrief;