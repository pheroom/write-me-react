import React, {FC, HTMLAttributes, useState} from 'react';
import HeaderModal from "../../UI/Modal/HeaderModal";
import TitleModal from "../../UI/Modal/TitleModal";
import ActionsHeaderModal from "../../UI/Modal/ActionsHeaderModal";
import ButtonCrossIcon from "../../UI/ButtonsApplied/ButtonCrossIcon";
import Modal from "../../UI/Modal/Modal";
import MainModal from "../../UI/Modal/MainModal";
import {IRoom} from "../../models/IRoom";
import ButtonBackIcon from "../../UI/ButtonsApplied/ButtonBackIcon";
import SeparateSightModal from "../../UI/Modal/SeparateLightModal";
import SearchWide from "../../UI/InputsApplied/SearchWide";
import ScrollBlockModal from "../../UI/Modal/ScrollBlockModal";
import ProfilePreviewSmall from "../ProfilePreviewSmall";
import Img from "../../UI/Img";
import PUser from "../../UI/Texts/PUser";
import HoverRowModal from "../../UI/Modal/HoverRowModal";

interface MembersListModalProps extends HTMLAttributes<HTMLDivElement>{
  closeModal: () => void
  room: IRoom
  back?: () => void
}

const MembersListModal: FC<MembersListModalProps> = ({closeModal, room, back}) => {
  const [searchText, setSearchText] = useState('')

  function resetValue(){
    setSearchText('')
  }

  return (
    <Modal closeModal={closeModal}>
      <HeaderModal>
        {back && <ButtonBackIcon alt={'back'} onClick={back} indent/>}
        <TitleModal smallIndent>Members</TitleModal>
        <ActionsHeaderModal>
          <ButtonCrossIcon className={'modal__close-btn'}
                           indent
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
            <HoverRowModal>
              <ProfilePreviewSmall userData={pid}/>
            </HoverRowModal>
          )}
          <HoverRowModal>
            <div className={'profile-preview-small'}>
              <Img className={'profile-preview-small__img'}
                   src={'https://cdn.ananasposter.ru/image/cache/catalog/poster/mult/95/2266-1000x830.jpg'}
                   alt="avatar"/>
              <div className={'profile-preview-small__info'}>
                <PUser className={'profile-preview-small__name'}>лайтлайтлайтлайтлайтлайтлайтлайтлайтлайтлайтлайтлайтлайтлайтлайтлайт</PUser>
                <PUser className={'profile-preview-small__email'}>last seen recentlylast seen recentlylast seen recentlylast seen recentlylast seen recentlylast seen recentlylast seen recently</PUser>
              </div>
            </div>
          </HoverRowModal>
        </ScrollBlockModal>
      </MainModal>
    </Modal>
  );
};

export default MembersListModal;