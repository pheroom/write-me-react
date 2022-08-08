import React from 'react';
import {Route, Routes} from "react-router-dom";
import {RouteNames} from "../router";
import PageNotFound from "../pages/PageNotFound";
import {useAppSelector} from "../store";
import EditProfile from "../pages/EditProfile";
import FeedPage from "../pages/FeedPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import User from "./User";
import EditRoom from "../pages/EditRoom";

const AppRouter = () => {

  const user = useAppSelector(state => state.user)

  return <Routes>
    {user.data
      ? <>
        <Route path={RouteNames.EDIT_PROFILE} element={<EditProfile/>}/>
        <Route path={RouteNames.FEED} element={<FeedPage/>}>
          <Route path={RouteNames.FEED_PARAMS} element={<FeedPage/>}/>
        </Route>
        <Route path={RouteNames.EDIT_ROOM} element={<EditRoom/>}>
          <Route path={RouteNames.EDIT_ROOM_PARAMS} element={<EditRoom/>}/>
        </Route>
        <Route path={RouteNames.USER} element={<User/>}>
          <Route path={RouteNames.USER_PARAMS} element={<User/>}/>
        </Route>
        <Route path={'*'} element={<PageNotFound path={RouteNames.FEED}/>}/>
      </>
      : <>
        <Route path={RouteNames.SIGNIN} element={<SignIn/>}/>
        <Route path={RouteNames.SIGNUP} element={<SignUp/>}/>
        <Route path={'*'} element={<PageNotFound path={RouteNames.SIGNIN}/>}/>
      </>
    }
  </Routes>
};

export default AppRouter;