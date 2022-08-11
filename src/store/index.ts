import {configureStore} from "@reduxjs/toolkit";
import userReducer from './UserReducers/UserSlice'
import roomsReducer from './RoomsReducers/RoomsSlice'
import roomReducer from './RoomReducers/RoomSlice'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    rooms: roomsReducer,
    room: roomReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
