import {getDatabase, onValue, ref} from "firebase/database";
import {IRoom} from "../models/IRoom";

export function roomObserver(roomId: string, prevState: IRoom | null, callback: (data: IRoom | null) => void){
  const unsubscribe = onValue(ref(getDatabase(), 'roomsInfo/' + roomId), (snapshot) => {
    const room: IRoom | null = snapshot.val();
    if(JSON.stringify(room) !== JSON.stringify(prevState)){
      callback(room)
    }
  })
  return unsubscribe
}