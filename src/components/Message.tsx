import React, {FC, useEffect, useState} from 'react';
import {IMessage} from "../models/IMessage";
import UserLink from "./UserLink";
import {IUser} from "../models/IUser";
import UsersService from "../firebaseAPI/UsersService";
import {Link} from "react-router-dom";
import {RouteNames} from "../router";
import RegularLoader from "../UI/RegularLoader";
import messages from "./Messages";
import {getUserByUid} from "../utils/getUserByUid";

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

  if(!user) return <RegularLoader/>
  return (
    <div className={'message ' + (className ? className : '')} onClick={e => setEventsVisible(message)}>
      <img className={'message__avatar ' + (isMyMessage ? 'message__avatar--send' : 'message__avatar--receive')} src={user.photoURL || 'https://cdn.ananasposter.ru/image/cache/catalog/poster/mult/95/2266-1000x830.jpg'} alt="ava"/>
      <div className={'message__main ' + (isMyMessage ? 'message__main--send' : 'message__main--receive')}>
        {!isMyMessage && <div className="message__name">{user.displayName}</div>}
        <div className="message__text">{message.text}</div>
      </div>
    </div>
  );
};

export default Message;