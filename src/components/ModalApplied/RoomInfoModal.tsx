import React, {FC, HTMLAttributes, useState} from 'react';
import HeaderModal from "../../UI/Modal/HeaderModal";
import TitleModal from "../../UI/Modal/TitleModal";
import ActionsHeaderModal from "../../UI/Modal/ActionsHeaderModal";
import ButtonDotsIcon from "../../UI/ButtonsApplied/ButtonDotsIcon";
import ButtonCrossIcon from "../../UI/ButtonsApplied/ButtonCrossIcon";
import RoomPreviewBrief from "../RoomPreviewBrief";
import SeparateModal from "../../UI/Modal/SeparateModal";
import BlockWithIcon from "../../UI/Modal/BlockWithIcon";
import infoIcon from "../../assets/icons/info.png";
import ButtonCopy from "../../UI/ButtonsApplied/ButtonCopy";
import LabelLight from "../../UI/LabelLight";
import PUser from "../../UI/Texts/PUser";
import ButtonWideModal from "../../UI/Modal/ButtonWideModal";
import groupLineIcon from "../../assets/icons/group-line.png";
import editIcon from "../../assets/icons/edit.png";
import exitIcon from "../../assets/icons/exit.png";
import Modal from "../../UI/Modal/Modal";
import MainModal from "../../UI/Modal/MainModal";
import {IRoom} from "../../models/IRoom";
import BlockIndentModal from "../../UI/Modal/BlockIndentModal";
import UsersListModal from "./UsersListModal";
import {getLength} from "../../utils/getLength";
import {getUsersForUsersList} from "../../utils/getUsersForUsersList";
import {getMembersLabel} from "../../utils/getMembersLabel";

interface RoomInfoModalProps extends HTMLAttributes<HTMLDivElement> {
  closeModal: () => void
  room: IRoom
  leaveRoom: () => void
  isOwner: boolean
  editRoomLink: () => void
}

const RoomInfoModal: FC<RoomInfoModalProps> = ({closeModal, isOwner, editRoomLink, room, leaveRoom}) => {
  const [membersListVisible, setMembersListVisible] = useState(false)

  function leaveRoomHandle() {
    if (window.confirm("do you want leave this room?")) {
      leaveRoom()
    }
  }

  const membersCount = getLength(room.participants)

  return (
    membersListVisible
      ? <UsersListModal title={'Участники'} users={getUsersForUsersList(room.participants)} closeModal={closeModal}
                        back={() => setMembersListVisible(false)}/>
      : <Modal closeModal={closeModal}>
        <HeaderModal>
          <TitleModal>Информация о группе</TitleModal>
          <ActionsHeaderModal>
            {/*<ButtonDotsIcon alt={'more'}*/}
            {/*                indent*/}
            {/*                onClick={e => console.log('dots')}/>*/}
            <ButtonCrossIcon alt={'close'}
                             indent
                             onClick={closeModal}/>
          </ActionsHeaderModal>
        </HeaderModal>
        <MainModal>
          <BlockIndentModal>
            <RoomPreviewBrief room={room}/>
          </BlockIndentModal>
          <SeparateModal/>
          <BlockWithIcon icon={infoIcon}>
            <div className={'modal__invite'}>
              <ButtonCopy className="modal__invite-btn"
                          copyText={window.location.href}>write.me/{room.title}</ButtonCopy>
              <LabelLight>Ссылка</LabelLight>
            </div>
            <div>
              {room.descriptions
                ? <PUser className="modal__description-text">
                  {room.descriptions}
                </PUser>
                : <i>Не задано</i>
              }
              <LabelLight>Описание</LabelLight>
            </div>
          </BlockWithIcon>
          <SeparateModal/>
          <div className="modal__room-members">
            <ButtonWideModal icon={groupLineIcon} onClick={() => setMembersListVisible(true)}>
              {`${membersCount} ${getMembersLabel(membersCount)}`}
            </ButtonWideModal>
          </div>
          <SeparateModal/>
          <div className="modal__room-action">
            {isOwner
              ? <ButtonWideModal icon={editIcon} onClick={editRoomLink}>
                Редактировать группу
              </ButtonWideModal>
              : <ButtonWideModal icon={exitIcon} onClick={leaveRoomHandle}>
                Покинуть группу
              </ButtonWideModal>
            }
          </div>
        </MainModal>
      </Modal>
  );
};

export default RoomInfoModal;