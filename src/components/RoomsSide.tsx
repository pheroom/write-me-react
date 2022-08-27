import React, {FC, useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {IRoom} from "../models/IRoom";
import Loader from "../UI/Loader";
import Error from "../UI/Error";
import ava from "../assets/ava.jpg";
import {menuVisibleContext} from "../App";
import InputFillPrimary from "../UI/InputFillPrimary";
import ButtonHoverImg from "../UI/ButtonsBase/ButtonHoverImg";
import burgerDisIcon from "../assets/icons/burger-disabled.png";
import burgerActIcon from "../assets/icons/burger-active.png";
import RegularLoader from "../UI/RegularLoader";

interface RoomsSideProps {
  rooms: IRoom[] | null
  isLoading: boolean
  error: string
  currentRoom: IRoom | null
  className: string
}

const RoomsSide: FC<RoomsSideProps> = ({rooms, isLoading, error, currentRoom, className}) => {
  const {status, change} = useContext(menuVisibleContext)

  const [initialPos, setInitialPos] = useState<null | number>(null);
  const [initialSize, setInitialSize] = useState<null | number>(null);

  const initial = (e: React.DragEvent<HTMLDivElement>) => {
    let resizable = document.getElementById('Resizable');
    setInitialPos(e.clientX);
    if (resizable) {
      setInitialSize(resizable.offsetWidth);
    }
  }

  const resize = (e: React.DragEvent<HTMLDivElement>) => {
    if (initialPos && initialSize) {
      let resizable = document.getElementById('Resizable') as HTMLElement;
      const newWidth = initialSize + e.clientX - initialPos
      if(newWidth > 250){
        resizable.style.width = `${newWidth}px`;
      }
    }
  }

  const [text, setText] = useState('')

  function resetText(){
    setText('')
  }

  return (
    <div id={'Resizable'} className={'rooms-side ' + className}>
      {isLoading && <RegularLoader fullStretch/>}
      {error && <Error>{error}</Error>}
      <div
        id='Draggable'
        className="rooms-side__resize"
        draggable
        onDragStart={initial}
        onDrag={resize}
      />
      <div className={'rooms-side__header'}>
        <ButtonHoverImg className={'rooms-side__menu-btn'} imgDisabled={burgerDisIcon} imgActive={burgerActIcon} onClick={change}/>
        <InputFillPrimary classNameBox={'rooms-side__search'} placeholder={'Search'} value={text} onChange={e => setText(e.target.value)} resetValue={resetText}/>
      </div>
      <div className="rooms-side__inner">
        {rooms
          ? rooms.map(room =>
            <Link className={'room-link ' + (currentRoom?.roomId === room.roomId ? 'room-link--active' : '')}
                  to={room.roomId} key={room.roomId}>
              <img className={'room-link__img'}
                   src={room.photoURL || ava}
                   alt="avatar"/>
              <div className="room-link__info">
                <h3 className={'room-link__name'}>{room.title}</h3>
                <p className={'room-link__description ' + (currentRoom?.roomId === room.roomId ? 'room-link__description--active' : '')}>
                  {room.descriptions || 'нет описания'}
                </p>
              </div>
            </Link>
          )
          : <h4>Комнат пока нет</h4>
        }
      </div>
    </div>
  );
};

export default RoomsSide;