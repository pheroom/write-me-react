import React from 'react';
import {Route, Routes} from "react-router-dom";
import {RouteNames} from "../router";
import PageNotFound from "../pages/PageNotFound";
import {useAppSelector} from "../store";
import FeedPage from "../pages/FeedPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AppRouter = () => {

  const user = useAppSelector(state => state.user)

  return <Routes>
    {user.data
      ? <>
        <Route path={RouteNames.FEED} element={<FeedPage/>}>
          <Route path={RouteNames.FEED_PARAMS} element={<FeedPage/>}/>
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