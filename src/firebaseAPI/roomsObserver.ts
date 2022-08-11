import {getDatabase, onValue, ref} from "firebase/database";
import {IRoom} from "../models/IRoom";

export function roomsObserver(prevState: IRoom[] | null, callback: (data: IRoom[] | null) => void){
  const unsubscribe = onValue(ref(getDatabase(), 'roomsInfo'), (snapshot) => {
    const data: IRoom[] | null = snapshot.val();
    const rooms = data ? Object.values(data) : data
    if(JSON.stringify(rooms) !== JSON.stringify(prevState)){
      callback(rooms)
    }
  })
  return unsubscribe
}