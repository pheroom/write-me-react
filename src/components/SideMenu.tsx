import React, {FC, useContext} from 'react';
import {menuVisibleContext} from "../App";
import {IUser} from "../models/IUser";
import ProfilePane from "./ProfilePane";

interface SideMenuProps{
  user: IUser
}

const SideMenu: FC<SideMenuProps> = ({user}) => {
  const {status, change} = useContext(menuVisibleContext)

  return (
    <div className={'side-menu '} onClick={e => change()}>
      <div className={"side-menu__inner " + (status && 'side-menu__inner--active')} onClick={e => e.stopPropagation()}>
        {user.displayName}
        <br/>
        {user.email}
        <br/>
      </div>
    </div>
  );
};

export default SideMenu;