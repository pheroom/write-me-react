import {getDatabase, onValue, ref} from "firebase/database";
import {IMessage} from "../models/IMessage";

export function messagesObserver(roomId: string, prevState: IMessage[] | null, callback: (data: IMessage[] | null) => void){
  const unsubscribe = onValue(ref(getDatabase(), 'roomsMessages/' + roomId), (snapshot) => {
    const data: IMessage[] | null = snapshot.val();
    const messages = data ? Object.values(data) : data
    if(JSON.stringify(messages) !== JSON.stringify(prevState)){
      callback(messages)
    }
  })
  return unsubscribe
}