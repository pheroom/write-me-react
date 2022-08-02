import React, {useEffect} from 'react';
import './App.css'
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth, browserSessionPersistence } from "firebase/auth";
import {getUserByFirebaseObject} from "./utils/getUserByFirebaseObject";
import {userSlice} from "./store/UserReducers/UserSlice";
import {useAppDispatch, useAppSelector} from "./store";
import {IFirebaseUser} from "./models/IFirebaseUser";
import {getStorage} from "firebase/storage";


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

function App() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const {setUser} = userSlice.actions

  useEffect(()=>{
    auth.setPersistence(browserSessionPersistence)
      .then(() => {
        if(auth.currentUser){
          const firebaseObj = getUserByFirebaseObject(auth.currentUser as IFirebaseUser)
          if(JSON.stringify(user.data) !== JSON.stringify(firebaseObj)){
            dispatch(setUser(firebaseObj))
          }
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }, [])

  return (
    <div className='app'>
      <Navbar/>
      <AppRouter/>
    </div>
  );
}

export default App;
