import React, {createRef, FC, useEffect, useRef, useState} from 'react';
import {IMessage} from "../models/IMessage";
import Message from "./Message";
import {useAppDispatch} from "../store";
import {removeMessage} from "../store/RoomReducers/RoomActionCreators";
import arrowIcon from '../assets/icons/arrow-down.png'
import {useObserverVisible} from "../hooks/useObserverVisible";

interface MessagesProps {
  messages: IMessage[] | null
  uid: string
  className: string
  messagesRef: React.RefObject<HTMLDivElement>
  toBotBtnRef: React.RefObject<HTMLDivElement>
  screenScrolled: boolean
  setScreenScrolled: (status: boolean) => void
  scrollToBottom: () => void
}

const Messages: FC<MessagesProps> = ({messages, uid, className, messagesRef, toBotBtnRef, scrollToBottom, setScreenScrolled, screenScrolled}) => {
  const [eventsVisible, setEventsVisible] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<null | IMessage>(null)

  // const [screenScrolled, setScreenScrolled] = useState(true)

  const anchorRef = createRef<HTMLDivElement>()

  const dispatch = useAppDispatch()

  useObserverVisible(anchorRef, setScreenScrolled)

  // function scrollToBottom(){
  //   setScreenScrolled(false)
  //   if(messagesRef.current){
  //     messagesRef.current.scroll({ top: messagesRef.current.scrollHeight, behavior: 'smooth' })
  //   }
  // }

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
    <div className={'messages ' + (className ? className : '')} ref={messagesRef}>
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
          <Message key={message.messageId} message={message} setEventsVisible={setEventsVisibleHandle} isMyMessage={message.authorId === uid} className={message.authorId === uid ? 'messages__message--send' : 'messages__message--receive'}/>
        )
        : <div>Сообщений пока нет</div>
      }
      <div className={'messages__down-box'} ref={toBotBtnRef} onClick={scrollToBottom} style={!screenScrolled ? {display: 'none'} : {}}>
        <img className={'messages__down-img'} src={arrowIcon} alt="down"/>
      </div>
      <div ref={anchorRef}></div>
    </div>
  );
};

export default Messages;