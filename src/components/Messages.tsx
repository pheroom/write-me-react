import React, {FC, useState} from 'react';
import {IMessage} from "../models/IMessage";
import Message from "./Message";
import {useAppDispatch} from "../store";
import {removeMessage} from "../store/RoomReducers/RoomActionCreators";

interface MessagesProps {
  messages: IMessage[] | null
  uid: string
}

const Messages: FC<MessagesProps> = ({messages, uid}) => {
  const [eventsVisible, setEventsVisible] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<null | IMessage>(null)

  const dispatch = useAppDispatch()

  function setEventsVisibleHandle(message?: IMessage){
    if(message){
      setEventsVisible(true)
      setCurrentMessage(message)
    } else {
      setEventsVisible(false)
      setCurrentMessage(null)
    }
  }

  function removeHandle(){
    if(currentMessage && window.confirm('Вы действительно хотите удалить сообщение: ' + currentMessage.text)){
      dispatch(removeMessage({message: currentMessage, uid}))
    }
  }

  function copyMessage(){
    if(currentMessage){
      navigator.clipboard.writeText(currentMessage.text)
    }
  }

  return (
    <div>
      {eventsVisible && <div style={{background: 'green'}}>
        <button onClick={removeHandle}>remove</button>
        <br/>
        <button onClick={e => setEventsVisible(false)}>Скрыть меню</button>
        <br/>
        <button onClick={copyMessage}>copy</button>
        <br/>
        {currentMessage?.text}
      </div>}
      {messages
        ? messages.map(message =>
          <Message setEventsVisible={setEventsVisibleHandle} message={message} key={message.messageId}/>
        )
        : <div>Сообщений пока нет</div>
      }
    </div>
  );
};

export default Messages;