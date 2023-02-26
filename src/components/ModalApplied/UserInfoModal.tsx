import React, {FC, HTMLAttributes, useEffect, useState} from 'react';
import HeaderModal from "../../UI/Modal/HeaderModal";
import TitleModal from "../../UI/Modal/TitleModal";
import ActionsHeaderModal from "../../UI/Modal/ActionsHeaderModal";
import ButtonCrossIcon from "../../UI/ButtonsApplied/ButtonCrossIcon";
import MainModal from "../../UI/Modal/MainModal";
import SeparateModal from "../../UI/Modal/SeparateModal";
import BlockWithIcon from "../../UI/Modal/BlockWithIcon";
import infoIcon from "../../assets/icons/info.png";
import LabelLight from "../../UI/LabelLight";
import PUser from "../../UI/Texts/PUser";
import Modal from "../../UI/Modal/Modal";
import {IUser} from "../../models/IUser";
import ButtonBackIcon from "../../UI/ButtonsApplied/ButtonBackIcon";
import {getUserByUid} from "../../utils/getUserByUid";
import BlockIndentModal from "../../UI/Modal/BlockIndentModal";
import ProfilePreview from "../ProfilePreview";

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
        <TitleModal smallIndent={!!back}>Информация</TitleModal>
        <ActionsHeaderModal>
          <ButtonCrossIcon indent
                           alt={'close'}
                           onClick={closeModal}/>
        </ActionsHeaderModal>
      </HeaderModal>
      <MainModal>
        {currentUser && <>
          <BlockIndentModal>
            <ProfilePreview size={'large'} userData={currentUser}/>
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