import React, {useEffect, useState} from 'react';
import './styles/index.scss'
import AppRouter from "./components/AppRouter";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
import {getUserByFirebaseObject} from "./utils/getUserByFirebaseObject";
import {userSlice} from "./store/UserReducers/UserSlice";
import {useAppDispatch, useAppSelector} from "./store";
import {IFirebaseUser} from "./models/IFirebaseUser";
import {getStorage} from "firebase/storage";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./UI/Loaders/Loader";
import SideMenu from "./components/SideMenu";
import {useSelectorUser} from "./hooks/redux";
import {setUserById} from "./store/UserReducers/UserActionCreators";
import {firebaseConfig} from "./firebaseConfig";
import {useNavigate} from "react-router-dom";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app)
const storage = getStorage(app)

export const menuVisibleContext = React.createContext({status: false, change: () => console.warn('menuVisibleContext.change не реализован')})

function App() {
  let [curPath, setCurPath] = useState(window.location.href)

  const navigate = useNavigate()

  const [menuVisible, setMenuVisible] = useState(false)
  const menuVisibleContextState = {status: menuVisible, change: () => setMenuVisible(prev => !prev)}

  const [isUserInit, setIsUserInit] = useState(false)

  const dispatch = useAppDispatch()
  const {userData, userError, isUserLoading} = useSelectorUser()

  const [user, loading, errorFirebase] = useAuthState(getAuth())

  useEffect(() => {
    if (user) {
      const firebaseObj = getUserByFirebaseObject(user as IFirebaseUser)
      if (JSON.stringify(userData) !== JSON.stringify(firebaseObj)) {
        setIsUserInit(true)
        dispatch(setUserById(firebaseObj.uid))
        navigate(curPath.slice(curPath.indexOf('#')+1))
      }
    }
  }, [user])

  useEffect(() => {
    isUserInit && setIsUserInit(false)
  }, [userData])

  if(loading || isUserInit) return <Loader filled/>
  return (
    <menuVisibleContext.Provider value={menuVisibleContextState}>
      <div className='app'>
        {isUserLoading && <Loader/>}
        <AppRouter/>
      </div>
    </menuVisibleContext.Provider>
  );
}

export default App;
