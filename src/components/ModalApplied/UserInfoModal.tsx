import React, {FC, HTMLAttributes, useEffect, useState} from 'react';
import HeaderModal from "../../UI/Modal/HeaderModal";
import TitleModal from "../../UI/Modal/TitleModal";
import ActionsHeaderModal from "../../UI/Modal/ActionsHeaderModal";
import ButtonDotsIcon from "../../UI/ButtonsApplied/ButtonDotsIcon";
import ButtonCrossIcon from "../../UI/ButtonsApplied/ButtonCrossIcon";
import MainModal from "../../UI/Modal/MainModal";
import RoomPreviewBrief from "../../UI/RoomPreviewBrief";
import SeparateModal from "../../UI/Modal/SeparateModal";
import BlockWithIcon from "../../UI/Modal/BlockWithIcon";
import infoIcon from "../../assets/icons/info.png";
import ButtonCopy from "../../UI/ButtonsApplied/ButtonCopy";
import LabelLight from "../../UI/LabelLight";
import PUser from "../../UI/Texts/PUser";
import ButtonWideModal from "../../UI/Modal/ButtonWideModal";
import groupLineIcon from "../../assets/icons/group-line.png";
import exitIcon from "../../assets/icons/exit.png";
import Modal from "../../UI/Modal/Modal";
import {IUser} from "../../models/IUser";
import ButtonBackIcon from "../../UI/ButtonsApplied/ButtonBackIcon";
import ProfilePreviewLarge from "../ProfilePreviewLarge";
import {getUserByUid} from "../../utils/getUserByUid";
import BlockIndentModal from "../../UI/Modal/BlockIndentModal";

interface UserInfoModalProps extends HTMLAttributes<HTMLDivElement> {
  closeModal: () => void
  userId: string
  back?: () => void
}

const UserInfoModal: FC<UserInfoModalProps> = ({closeModal, userId, back}) => {
  const [currentUser, setCurrentUser] = useState<null | IUser>(null)

  useEffect(() => {
    getUserByUid(userId, setCurrentUser)
  }, [userId])

  return (
    <Modal closeModal={closeModal}>
      <HeaderModal>
        {back && <ButtonBackIcon alt={'back'} onClick={back} indent/>}
        <TitleModal smallIndent={!!back}>User Info</TitleModal>
        <ActionsHeaderModal>
          <ButtonCrossIcon className={'modal__close-btn'}
                           indent
                           alt={'close'}
                           onClick={closeModal}/>
        </ActionsHeaderModal>
      </HeaderModal>
      <MainModal>
        {currentUser && <>
          <BlockIndentModal>
            <ProfilePreviewLarge user={currentUser}/>
          </BlockIndentModal>
          <SeparateModal/>
          <BlockWithIcon icon={infoIcon}>
            {currentUser.descriptions && <div className={'modal__invite'}>
              <PUser className="modal__invite-btn">{currentUser.descriptions}</PUser>
              <LabelLight>Bio</LabelLight>
            </div>}
            <div>
              {currentUser.phoneNumber
                ? <PUser className="modal__invite-btn">{currentUser.phoneNumber}</PUser>
                : <p>phone number is not specified</p>
              }
              <LabelLight>Mobile</LabelLight>
            </div>
          </BlockWithIcon>
        </>}
      </MainModal>
    </Modal>
  );
};

export default UserInfoModal;