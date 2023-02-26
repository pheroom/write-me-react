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
import ProfilePreview from "../ProfilePreview";
import HoverRowModal from "../../UI/Modal/HoverRowModal";
import UserInfoModal from "./UserInfoModal";

interface MembersListModalProps extends HTMLAttributes<HTMLDivElement>{
  closeModal: () => void
  room: IRoom
  back?: () => void
  modal?: (uid: string) => void
}

const OBSOLETE__MembersListModal: FC<MembersListModalProps> = ({closeModal, modal, room, back}) => {
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
          <TitleModal smallIndent={!!back}>Members</TitleModal>
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
            {room.participants && Object.entries(room.participants).map(([pid, status]) =>
              <HoverRowModal key={pid} onClick={() => modal ? modal(pid) : setCurrentUserInfo(pid)}>
                <ProfilePreview
                  userData={pid}
                  status={(status === ParticipantStatuses.ADMIN && 'админ') || (status === ParticipantStatuses.HOST && 'владелец') || ''}
                />
              </HoverRowModal>
            )}
          </ScrollBlockModal>
        </MainModal>
      </Modal>
  );
};

export default OBSOLETE__MembersListModal;