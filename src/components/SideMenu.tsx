import React, {FC, useContext} from 'react';
import {menuVisibleContext} from "../App";
import {IUser} from "../models/IUser";
import groupIcon from '../assets/icons/group-blue.png'
import profileIcon from '../assets/icons/profile-orange.png'
import ProfilePreview from "./ProfilePreview";
import Img from "../UI/Img";

interface SideMenuProps {
  user: IUser
  createRoom: (title: string, isPrivate: boolean, photoUrl: string | null) => void
  showCreateRoom: () => void
  showEditProfile: () => void
  showProfile: (id: string) => void
}

const SideMenu: FC<SideMenuProps> = ({
                                       user,
                                       showCreateRoom,
                                       showEditProfile,
                                       showProfile
                                     }) => {
  const {status, change} = useContext(menuVisibleContext)

  function showModal(callback: () => void){
    callback()
    change()
  }

  return (
    <div className={'side-menu '}>
      <div className={status ? 'side-menu__bg--active' : ''} onClick={e => change()}></div>
      <div className={"side-menu__inner " + (status ? 'side-menu__inner--active' : '')}>
        <div className={'side-menu__header'}>
          <ProfilePreview size={'medium'} onClick={() => showProfile(user.uid)} userData={user}/>
        </div>
        <div className={'side-menu__nav nav'}>
          <div className={'nav__link'} onClick={() => showModal(showCreateRoom)}>
            <Img className={'nav__img'} src={groupIcon} alt="create group"/>
            <p className={'nav__text'}>Создать группу</p>
          </div>
          <div className={'nav__link'} onClick={() => showModal(showEditProfile)}>
            <Img className={'nav__img'} src={profileIcon} alt="create group"/>
            <p className={'nav__text'}>Изменить профиль</p>
          </div>
        </div>
        <div className={'side-menu__footer'}>
          <div className={'side-menu__footer-title'}>WriteMe</div>
          <div className="side-menu__footer-info">
            <a className={'side-menu__footer-source'} target="_blank" rel="noreferrer"
               href={'https://github.com/pheroom/write-me-react'}>
              by Pheroom
            </a> - <span className={'side-menu__footer-about'}>О проекте</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;