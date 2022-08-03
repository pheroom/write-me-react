import React from 'react';
import {Route, Routes} from "react-router-dom";
import {PrivateRoutes, PublicRoutes, RouteNames} from "../router";
import PageNotFound from "../pages/PageNotFound";
import {useAppSelector} from "../store";

const AppRouter = () => {

  const user = useAppSelector(state => state.user)

  return <Routes>
    {user.data
      ? <>
        {PrivateRoutes.map(route =>
          <Route key={route.path} path={route.path} element={<route.element/>}/>
        )}
        <Route path={'*'} element={<PageNotFound path={RouteNames.CHAT}/>}/>
      </>
      : <>
        {PublicRoutes.map(route =>
          <Route key={route.path} path={route.path} element={<route.element/>}/>
        )}
        <Route path={'*'} element={<PageNotFound path={RouteNames.SIGNIN}/>}/>
      </>
    }
  </Routes>
};

export default AppRouter;