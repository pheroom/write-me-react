import React, {FC, useEffect, useState} from 'react';
import {IMessage} from "../models/IMessage";
import {IUser} from "../models/IUser";
import RegularLoader from "../UI/Loaders/RegularLoader";
import {getUserByUid} from "../utils/getUserByUid";
import userIcon from '../assets/icons/user-base.png'
import Img from "../UI/Img";

interface MessageProps{
  message: IMessage
  setEventsVisible: (message: IMessage) => void
  className: string
  isMyMessage: boolean
  scrollToBottom: () => void
}

const Message: FC<MessageProps> = ({scrollToBottom, setEventsVisible, message, className, isMyMessage}) => {
  const [user, setUser] = useState<null | IUser>(null)

  useEffect(()=>{
    getUserByUid(message.authorId, setUser)
  }, [message.authorId])

  useEffect(()=>{
    if(user){
      scrollToBottom()
    }
  }, [user])

  if(!user) return <RegularLoader fullWidth/>
  return (
    <div className={'message ' + (className ? className : '')} onClick={e => setEventsVisible(message)}>
      <Img
        className={'message__avatar ' + (isMyMessage ? 'message__avatar--send' : 'message__avatar--receive')}
        src={user.photoURL || userIcon} alt="ava"
      />
      <div className={'message__main ' + (isMyMessage ? 'message__main--send' : 'message__main--receive')}>
        {!isMyMessage && <div className="message__name">{user.displayName}</div>}
        <div className="message__text">{message.text}</div>
      </div>
    </div>
  );
};

export default Message;