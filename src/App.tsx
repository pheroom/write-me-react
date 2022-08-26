import React, {useEffect, useState} from 'react';
import './styles/index.scss'
import Navbar from "./components/Navbar";
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
import Loader from "./UI/Loader";
import SideMenu from "./components/SideMenu";
import {useSelectorUser} from "./hooks/redux";
import {setUserById} from "./store/UserReducers/UserActionCreators";

const firebaseConfig = {
  apiKey: "AIzaSyCVlhvxUeJ_wISXgIiYmg48_o6js6NqpYo",
  authDomain: "writeme-37420.firebaseapp.com",
  projectId: "writeme-37420",
  storageBucket: "writeme-37420.appspot.com",
  messagingSenderId: "729409574095",
  appId: "1:729409574095:web:bd613bdfd52d8d5736d3ba",
  measurementId: "G-GZF0R8J1DP",
  databaseURL: 'https://writeme-37420-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app)
const storage = getStorage(app)

export const menuVisibleContext = React.createContext({status: false, change: () => console.warn('menuVisibleContext.change не реализован')})

function App() {
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
