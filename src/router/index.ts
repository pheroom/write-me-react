import React from "react";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Chat from "../components/Chat";
import EditProfile from "../pages/EditProfile";

export interface IRoute{
  path: string
  element: React.ComponentType
}

export enum RouteNames{
  SIGNUP = '/sign-up',
  SIGNIN = '/sign-in',
  CHAT = '/',
  EDIT_PROFILE = '/edit-profile',
}

export const PublicRoutes: IRoute[] = [
  {path: RouteNames.SIGNIN, element: SignIn},
  {path: RouteNames.SIGNUP, element: SignUp},
]

export const PrivateRoutes: IRoute[] = [
  {path: RouteNames.CHAT, element: Chat},
  {path: RouteNames.EDIT_PROFILE, element: EditProfile},
]