import React, {FC, HTMLAttributes, useState} from 'react';
import HeaderModal from "../../UI/Modal/HeaderModal";
import TitleModal from "../../UI/Modal/TitleModal";
import ActionsHeaderModal from "../../UI/Modal/ActionsHeaderModal";
import ButtonCrossIcon from "../../UI/ButtonsApplied/ButtonCrossIcon";
import Modal from "../../UI/Modal/Modal";
import MainModal from "../../UI/Modal/MainModal";
import {IRoom, ParticipantStatuses} from "../../models/IRoom";
import ButtonBackIcon from "../../UI/ButtonsApplied/ButtonBackIcon";
import SeparateSightModal from "../../UI/Modal/SeparateLightModal";
import SearchWide from "../../UI/InputsApplied/SearchWide";
import ScrollBlockModal from "../../UI/Modal/ScrollBlockModal";
import ProfilePreviewSmall from "../ProfilePreviewSmall";
import HoverRowModal from "../../UI/Modal/HoverRowModal";
import UserInfoModal from "./UserInfoModal";

interface ApplicationsListModalProps extends HTMLAttributes<HTMLDivElement>{
  closeModal: () => void
  room: IRoom
  back?: () => void
  modal?: (uid: string) => void
}

const ApplicationsListModal: FC<ApplicationsListModalProps> = ({closeModal, modal, room, back}) => {
  const [currentUserInfo, setCurrentUserInfo] = useState<null | string>(null)

  const [searchText, setSearchText] = useState('')

  function resetValue(){
    setSearchText('')
  }

  return (
    currentUserInfo
      ? <UserInfoModal closeModal={closeModal} userId={currentUserInfo} back={() => setCurrentUserInfo(null)}/>
      : <Modal closeModal={closeModal}>
        <HeaderModal>
          {back && <ButtonBackIcon alt={'back'} onClick={back} indent/>}
          <TitleModal smallIndent={!!back}>Applications</TitleModal>
          <ActionsHeaderModal>
            <ButtonCrossIcon indent
                             alt={'close'}
                             onClick={closeModal}/>
          </ActionsHeaderModal>
        </HeaderModal>
        <MainModal>
          <SeparateSightModal/>
          <SearchWide value={searchText} onChange={e => setSearchText(e.target.value)} resetValue={resetValue}/>
          <SeparateSightModal/>
          <ScrollBlockModal>
            {room.applications && Object.entries(room.applications).map(([aid, status]) =>
              <HoverRowModal key={aid} onClick={() => {
                if(modal){
                  modal(aid)
                }else {
                  setCurrentUserInfo(aid)
                }
              }
              }>
                <ProfilePreviewSmall
                  userData={aid}
                />
              </HoverRowModal>
            )}
          </ScrollBlockModal>
        </MainModal>
      </Modal>
  );
};

export default ApplicationsListModal;