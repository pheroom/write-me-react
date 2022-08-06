import {useAppSelector} from "../store";

export function useSelectorUser(){
  const {data, isLoading, error} = useAppSelector(state => state.user)
  return {userData: data, isUserLoading: isLoading, userError: error}
}

export function useSelectorRooms(){
  const {data, isLoading, error} = useAppSelector(state => state.rooms)
  return {roomsData: data, isRoomsLoading: isLoading, roomsError: error}
}

export function useSelectorRoom(){
  const {data, isLoading, error} = useAppSelector(state => state.room)
  return {roomData: data, isRoomLoading: isLoading, roomError: error}
}