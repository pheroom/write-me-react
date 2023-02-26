import React, {FC, HTMLAttributes, useState} from 'react';
import HeaderModal from "../../UI/Modal/HeaderModal";
import TitleModal from "../../UI/Modal/TitleModal";
import ActionsHeaderModal from "../../UI/Modal/ActionsHeaderModal";
import ButtonCrossIcon from "../../UI/ButtonsApplied/ButtonCrossIcon";
import Modal from "../../UI/Modal/Modal";
import MainModal from "../../UI/Modal/MainModal";
import ButtonBackIcon from "../../UI/ButtonsApplied/ButtonBackIcon";
import SeparateSightModal from "../../UI/Modal/SeparateLightModal";
import ProfilePreview from "../ProfilePreview";
import HoverRowModal from "../../UI/Modal/HoverRowModal";
import UserInfoModal from "./UserInfoModal";
import Popup from "./Popup";
import {IPopupButton} from "../../models/IPopupButton";

// function getUsersByUids(users: { uid: string, status?: string }[]) {
//   const resUsers = new Array(users.length)
//   users.forEach(({uid, status}, index) => {
//     if (status) {
//       resUsers[index] = resUsers[index] ? {...resUsers[index], status} : {status}
//     }
//     getUserByUid(uid, (user: IUser) => {
//       resUsers[index] = {...resUsers[index], ...user}
//     })
//   })
//   return resUsers
// }

interface UsersListModalProps extends HTMLAttributes<HTMLDivElement> {
  closeModal: () => void
  back?: () => void
  // popupButtons?: {text?: string, onClick?: (data: string) => void, needShowProfile?: boolean, confirmText?: string, dontFadeAfter?: boolean}[]
  popupButtons?: IPopupButton[]
  title: string
  users: { uid: string, status?: string }[]
}

const UsersListModal: FC<UsersListModalProps> = ({closeModal, title, popupButtons, users, back}) => {
  const [choiceVisible, setChoiceVisible] = useState<string | null>(null)

  const [currentUserInfo, setCurrentUserInfo] = useState<null | string>(null)

  function clickUserHandle(uid: string) {
    if (popupButtons) {
      setChoiceVisible(uid)
    } else {
      setCurrentUserInfo(uid)
    }
  }

  return (
    currentUserInfo
      ? <UserInfoModal closeModal={closeModal} userId={currentUserInfo} back={() => setCurrentUserInfo(null)}/>
      : <Modal closeModal={closeModal}>

        {choiceVisible && popupButtons &&
          <Popup buttons={popupButtons} showProfile={() => setCurrentUserInfo(choiceVisible)} closeModal={() => setChoiceVisible(null)} data={choiceVisible}/>}

        <HeaderModal>
          {back && <ButtonBackIcon alt={'back'} onClick={back} indent/>}
          <TitleModal smallIndent={!!back}>{title}</TitleModal>
          <ActionsHeaderModal>
            <ButtonCrossIcon indent
                             alt={'close'}
                             onClick={closeModal}/>
          </ActionsHeaderModal>
        </HeaderModal>
        <MainModal>
          <SeparateSightModal/>
          {users.map(({status, uid}) =>
            <HoverRowModal key={uid} onClick={() => clickUserHandle(uid)}>
              <ProfilePreview
                status={status}
                userData={uid}
              />
            </HoverRowModal>
          )}
        </MainModal>
      </Modal>
  );
};

export default UsersListModal;