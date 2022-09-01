import React, {FC, useEffect, useState} from 'react';
import {IMessage} from "../models/IMessage";
import {IUser} from "../models/IUser";
import RegularLoader from "../UI/Loaders/RegularLoader";
import {getUserByUid} from "../utils/getUserByUid";
import userIcon from '../assets/icons/user-base.png'
import Img from "../UI/Img";
import PUser from "../UI/Texts/PUser";
import {getDate, getTime} from "../utils/getDate";

interface MessageProps{
  message: IMessage
  setEventsVisible: (message: IMessage) => void
  className: string
  isMyMessage: boolean
  scrollToBottom: () => void
  showProfile: (id: string) => void
}

const Message: FC<MessageProps> = ({scrollToBottom, showProfile, setEventsVisible, message, className, isMyMessage}) => {
  const [user, setUser] = useState<null | IUser>(null)

  useEffect(()=>{
    getUserByUid(message.authorId, setUser)
  }, [message.authorId])

  useEffect(()=>{
    if(user){
      scrollToBottom()
    }
  }, [user])

  function showProfileHandle(e: React.MouseEvent){
    e.stopPropagation()
    showProfile(message.authorId)
  }

  function textClick(e: React.MouseEvent){
    e.stopPropagation()
  }

  if(!user) return <RegularLoader fullWidth/>
  return (
    <div className={'message ' + (isMyMessage ? 'message--send ' : 'message--receive ') + (className || '')}>
      <Img
        className={'message__avatar ' + (isMyMessage ? 'message__avatar--send' : 'message__avatar--receive')}
        src={user.photoURL || userIcon} alt="ava" onClick={showProfileHandle}
      />
      <div onClick={e => setEventsVisible(message)} className={'message__main ' + (isMyMessage ? 'message__main--send' : 'message__main--receive')}>
        <div className="message__content">
          {!isMyMessage && <p onClick={showProfileHandle} className="message__name">{user.displayName}</p>}
          <PUser onClick={textClick} className="message__text">{message.text}</PUser>
        </div>
        <div className="message__date">
          <p className="message__date-time">{getTime(message.createdAt)}</p>
          <p className="message__date-date">{getDate(message.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;