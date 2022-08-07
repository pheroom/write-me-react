import React, {FC} from 'react';
import {IMessage} from "../models/IMessage";
import UserLink from "./UserLink";

interface MessageProps{
  message: IMessage
  setEventsVisible: (message: IMessage) => void
}

const Message: FC<MessageProps> = ({setEventsVisible, message}) => {

  return (
    <div onClick={e => setEventsVisible(message)}>
      <UserLink uid={message.authorId}/>: {message.text}
    </div>
  );
};

export default Message;