import React, {createRef, FC, useEffect, useRef, useState} from 'react';
import {IMessage} from "../models/IMessage";
import Message from "./Message";
import {useAppDispatch} from "../store";
import {removeMessage} from "../store/RoomReducers/RoomActionCreators";
import arrowIcon from '../assets/icons/arrow-down.png'
import {useObserverVisible} from "../hooks/useObserverVisible";
import EditImage from "./EditImage";
import Popup from "./ModalApplied/Popup";

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
  const [currentMessage, setCurrentMessage] = useState<null | IMessage>(null)

  const anchorRef = createRef<HTMLDivElement>()

  const dispatch = useAppDispatch()

  useObserverVisible(anchorRef, setScreenScrolled)

  function setEventsVisibleHandle(message?: IMessage){
    if(message){
      setCurrentMessage(message)
    } else {
      setCurrentMessage(null)
    }
  }

  function removeHandle(){
    if(currentMessage && window.confirm('Вы действительно хотите удалить сообщение: ' + currentMessage.text)){
      dispatch(removeMessage({message: currentMessage, uid}))
    }
  }

  function copyMessage(data: any){
    console.log(data)
    if(currentMessage){
      navigator.clipboard.writeText(currentMessage.text)
    }
  }

  return (
    <div className={'messages ' + (className ? className : '')} ref={messagesRef}>
      {currentMessage && <Popup buttons={[
        {text: 'Скопировать', onClick: copyMessage, needFadeAfter: true},
        {text: 'Удалить', onClick: (data) => console.log(data), needFadeAfter: true, confirmText: 'Вы действительно хотите удалить это сообщение?'},
      ]} data={currentMessage} closeModal={() => setCurrentMessage(null)}/>}
      {messages
        ? messages.map(message =>
          <Message scrollToBottom={scrollToBottom} key={message.messageId} message={message} setEventsVisible={setEventsVisibleHandle} isMyMessage={message.authorId === uid} className={message.authorId === uid ? 'messages__message--send' : 'messages__message--receive'}/>
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