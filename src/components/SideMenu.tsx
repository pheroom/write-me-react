import React, {FC, useContext} from 'react';
import {menuVisibleContext} from "../App";
import {IUser} from "../models/IUser";
import ProfilePreviewLarge from "./ProfilePreviewLarge";
import groupIcon from '../assets/icons/group.png'
import profileIcon from '../assets/icons/profile.png'

interface SideMenuProps{
  user: IUser
}

const SideMenu: FC<SideMenuProps> = ({user}) => {
  const {status, change} = useContext(menuVisibleContext)

  return (
    <div className={'side-menu '}>
      <div className={status ? 'side-menu__bg--active' : ''} onClick={e => change()}></div>
      <div className={"side-menu__inner " + (status ? 'side-menu__inner--active' : '')} >
        <div className={'side-menu__header'}>
          <ProfilePreviewLarge user={user}/>
        </div>
        <div className={'side-menu__nav nav'}>
          <div className={'nav__link'}>
            <img className={'nav__img'} src={groupIcon} alt="create group"/>
            <p className={'nav__text'}>New Group</p>
          </div>
          <div className={'nav__link'}>
            <img className={'nav__img'} src={profileIcon} alt="create group"/>
            <p className={'nav__text'}>Edit profile</p>
          </div>
        </div>
        <div className={'side-menu__footer'}>
          <div className={'side-menu__footer-title'}>WriteMe</div>
          <div className="side-menu__footer-info">
            <a className={'side-menu__footer-source'} target="_blank" rel="noreferrer" href={'https://github.com/pheroom/write-me-react'}>
              by Pheroom
            </a> - <span className={'side-menu__footer-about'}>About</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;