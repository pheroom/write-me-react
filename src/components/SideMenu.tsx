import React, {FC, useContext, useState} from 'react';
import {menuVisibleContext} from "../App";
import {IUser} from "../models/IUser";
import ProfilePreviewMedium from "./ProfilePreviewMedium";
import groupIcon from '../assets/icons/group.png'
import profileIcon from '../assets/icons/profile.png'
import CreateRoomModal from "./ModalApplied/CreateRoomModal";

interface SideMenuProps {
  user: IUser
  createRoom: (title: string, isPrivate: boolean, photoUrl: string | null) => void
}

const SideMenu: FC<SideMenuProps> = ({user, createRoom}) => {
  const {status, change} = useContext(menuVisibleContext)

  const [createRoomVisible, setCreateRoomVisible] = useState(false)

  function showModal(modal: 'create-room'){
    change()
    if(modal === 'create-room'){
      setCreateRoomVisible(true)
    }
  }

  return (
    createRoomVisible
      ? <CreateRoomModal createRoom={createRoom} closeModal={() => setCreateRoomVisible(false)}/>
      : <div className={'side-menu '}>
        <div className={status ? 'side-menu__bg--active' : ''} onClick={e => change()}></div>
        <div className={"side-menu__inner " + (status ? 'side-menu__inner--active' : '')}>
          <div className={'side-menu__header'}>
            <ProfilePreviewMedium user={user}/>
          </div>
          <div className={'side-menu__nav nav'}>
            <div className={'nav__link'} onClick={() => showModal('create-room')}>
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
              <a className={'side-menu__footer-source'} target="_blank" rel="noreferrer"
                 href={'https://github.com/pheroom/write-me-react'}>
                by Pheroom
              </a> - <span className={'side-menu__footer-about'}>About</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SideMenu;