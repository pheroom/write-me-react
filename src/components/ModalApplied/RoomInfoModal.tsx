import React, {FC, HTMLAttributes, useState} from 'react';
import HeaderModal from "../../UI/Modal/HeaderModal";
import TitleModal from "../../UI/Modal/TitleModal";
import ActionsHeaderModal from "../../UI/Modal/ActionsHeaderModal";
import ButtonDotsIcon from "../../UI/ButtonsApplied/ButtonDotsIcon";
import ButtonCrossIcon from "../../UI/ButtonsApplied/ButtonCrossIcon";
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
import MainModal from "../../UI/Modal/MainModal";
import {IRoom} from "../../models/IRoom";
import MembersListModal from "./MembersListModal";

interface RoomInfoModalProps extends HTMLAttributes<HTMLDivElement> {
  closeModal: () => void
  room: IRoom
  leaveRoom: () => void
}

const RoomInfoModal: FC<RoomInfoModalProps> = ({closeModal, room, leaveRoom}) => {
  const [membersListVisible, setMembersListVisible] = useState(false)

  function leaveRoomHandle() {
    if (window.confirm("do you want leave this room?")) {
      leaveRoom()
    }
  }

  return (
    <>
      {membersListVisible
        ? <MembersListModal room={room} closeModal={closeModal} back={() => setMembersListVisible(false)}/>
        : <Modal closeModal={closeModal}>
          <HeaderModal>
            <TitleModal>Channel Info</TitleModal>
            <ActionsHeaderModal>
              <ButtonDotsIcon alt={'more'}
                              indent
                              onClick={e => console.log('dots')}/>
              <ButtonCrossIcon alt={'close'}
                               indent
                               onClick={closeModal}/>
            </ActionsHeaderModal>
          </HeaderModal>
          <MainModal>
            <RoomPreviewBrief/>
            <SeparateModal/>
            <BlockWithIcon icon={infoIcon}>
              <div>
                <div className={'modal__invite'}>
                  <ButtonCopy className="modal__invite-btn" copyText={window.location.href}>t.me/gpkdota21</ButtonCopy>
                  <LabelLight>Link</LabelLight>
                </div>
                <div>
                  <PUser className="modal__description-text">
                    всем привет)Он бета-тестер и зная всё об этой игре, быстро завоевал популярность у игроков
                  </PUser>
                  <LabelLight>Description</LabelLight>
                </div>
              </div>
            </BlockWithIcon>
            <SeparateModal/>
            <div className="modal__room-members">
              <ButtonWideModal icon={groupLineIcon} text={'1 subscribers'} onClick={() => setMembersListVisible(true)}/>
            </div>
            <SeparateModal/>
            <div className="modal__room-action">
              <ButtonWideModal icon={exitIcon} text={'Leave channel'} onClick={leaveRoomHandle}/>
            </div>
          </MainModal>
        </Modal>
      }
    </>
  );
};

export default RoomInfoModal;