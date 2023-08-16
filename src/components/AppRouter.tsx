import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {RouteNames} from "../router";
import PageNotFound from "../pages/PageNotFound";
import {useAppSelector} from "../store";
import FeedPage from "../pages/FeedPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ViewImg from "./ViewImg";

const AppRouter = () => {
  const user = useAppSelector(state => state.user)

  const location = useLocation();
  // @ts-ignore
  const background = location.state && location.state.background;
  // @ts-ignore
  const photoData = location.state && location.state.photoData;

  return <>
    <Routes>
      {user.data
        ? <>
          <Route path={RouteNames.FEED} element={<FeedPage/>}>
            <Route path={RouteNames.FEED_PARAMS} element={<FeedPage/>}/>
          </Route>
          {background && (
            <>
              <Route path={RouteNames.IMG} element={<ViewImg data={photoData || ''}/>}/>
            </>
          )}
          <Route path={'*'} element={<PageNotFound path={RouteNames.FEED}/>}/>
        </>
        : <>
          <Route path={RouteNames.SIGNIN} element={<SignIn/>}/>
          <Route path={RouteNames.SIGNUP} element={<SignUp/>}/>
          <Route path={'*'} element={<PageNotFound path={RouteNames.SIGNIN}/>}/>
        </>
      }
    </Routes>
  </>
};

export default AppRouter;