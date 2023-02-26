import React, {
  ForwardedRef,
  useContext, useEffect,
  useState
} from 'react';
import {Link} from "react-router-dom";
import {IRoom} from "../models/IRoom";
import Error from "../UI/Errors/Error";
import groupIcon from "../assets/icons/group-base.png";
import {menuVisibleContext} from "../App";
import InputFillPrimary from "../UI/InputFillPrimary";
import ButtonHoverImg from "../UI/ButtonsBase/ButtonHoverImg";
import burgerDisIcon from "../assets/icons/burger-disabled.png";
import burgerActIcon from "../assets/icons/burger-active.png";
import RegularLoader from "../UI/Loaders/RegularLoader";

interface RoomsSideProps {
  rooms: IRoom[] | null
  isLoading: boolean
  error: string
  currentRoom: IRoom | null
  className: string
}

const RoomsSide = React.forwardRef(({rooms, isLoading, error, currentRoom, className}: RoomsSideProps, ref: ForwardedRef<HTMLDivElement>) => {
  const {change} = useContext(menuVisibleContext)

  const [sortedRooms, setSortedRooms] = useState(rooms)

  useEffect(() => {
    setSortedRooms(rooms)
  }, [rooms])

  const [text, setText] = useState('')

  function setTextHandle(e: React.ChangeEvent<HTMLInputElement>){
    const newText = e.target.value
    setText(newText)
    rooms && setSortedRooms(newText ? rooms.filter(room => room.title.includes(newText)) : rooms)
  }

  function resetText(){
    setText('')
    setSortedRooms(rooms)
  }

  return (
    <div id={'Resizable'} ref={ref} className={'rooms-side ' + className}>
      {isLoading && <RegularLoader fullStretch/>}
      {error && <Error>{error}</Error>}
      <div className={'rooms-side__header'}>
        <ButtonHoverImg className={'rooms-side__menu-btn'} imgDisabled={burgerDisIcon} imgActive={burgerActIcon} onClick={change}/>
        <InputFillPrimary classNameBox={'rooms-side__search'} placeholder={'Search'} value={text} onChange={setTextHandle} resetValue={resetText}/>
      </div>
      <div className="rooms-side__inner">
        {sortedRooms
          ? sortedRooms.map(room =>
            <Link className={'room-link ' + (currentRoom?.roomId === room.roomId ? 'room-link--active' : '')}
                  to={room.roomId} key={room.roomId}>
              <img className={'room-link__img'}
                   src={room.photoURL || groupIcon}
                   alt="avatar"/>
              <div className="room-link__info">
                <h3 className={'room-link__name'}>{room.title}</h3>
                <p className={'room-link__description ' + (currentRoom?.roomId === room.roomId ? 'room-link__description--active' : '')}>
                  {room.descriptions || <i>описание не задано</i>}
                </p>
              </div>
            </Link>
          )
          : <div className={'rooms-side__absent'}>
            <p className={'rooms-side__absent-text'}>Нет доступных групп...</p>
          </div>
        }
      </div>
    </div>
  );
})

export default RoomsSide;