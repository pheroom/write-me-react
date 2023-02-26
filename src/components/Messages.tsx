import React, {createRef, FC, useState} from 'react';
import {IMessage} from "../models/IMessage";
import Message from "./Message";
import {useAppDispatch} from "../store";
import {removeMessage} from "../store/RoomReducers/RoomActionCreators";
import arrowIcon from '../assets/icons/arrow-down.png'
import {useObserverVisible} from "../hooks/useObserverVisible";
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
  showProfile: (id: string) => void
}

const Messages: FC<MessagesProps> = ({showProfile, messages, uid, className, messagesRef, toBotBtnRef, scrollToBottom, setScreenScrolled, screenScrolled}) => {
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

  function removeHandle(data: IMessage){
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
        {text: 'Скопировать', onClick: copyMessage},
        {text: 'Удалить', onClick: (data) => removeHandle(data)},
      ]} data={currentMessage} closeModal={() => setCurrentMessage(null)}/>}

      {messages
        ? messages.map(message =>
          <Message showProfile={showProfile} scrollToBottom={scrollToBottom} key={message.messageId} message={message} setEventsVisible={setEventsVisibleHandle} isMyMessage={message.authorId === uid} className={message.authorId === uid ? 'messages__message--send' : 'messages__message--receive'}/>
        )
        : <div className={'feed__room feed__room-absent'}>
          <p className={'feed__room-text'}>Сообщений пока нет...</p>
        </div>
      }
      <div className={'messages__down-box'} ref={toBotBtnRef} onClick={scrollToBottom} style={!screenScrolled ? {display: 'none'} : {}}>
        <img className={'messages__down-img'} src={arrowIcon} alt="down"/>
      </div>
      <div ref={anchorRef}></div>
    </div>
  );
};

export default Messages;