import React, {} from 'react';
import sadIcon from '../assets/emoji-sadness.png'
import Img from "../UI/Img";

const BlockedRoom = React.forwardRef(({}, ref: React.ForwardedRef<HTMLDivElement>) => {

  return (
    <div className={'feed__room-blocked feed__room'} ref={ref}>
      <Img src={sadIcon}/>
      <p className={'feed__room-text'}>Вас заблокировали в этой группе...</p>
    </div>
  )
})

export default BlockedRoom;