import React, {ChangeEvent, FC, HTMLAttributes, useState} from 'react';
import Modal from "../../UI/Modal/Modal";
import HeaderModal from "../../UI/Modal/HeaderModal";
import TitleModal from "../../UI/Modal/TitleModal";
import ActionsHeaderModal from "../../UI/Modal/ActionsHeaderModal";
import ButtonCrossIcon from "../../UI/ButtonsApplied/ButtonCrossIcon";
import MainModal from "../../UI/Modal/MainModal";
import Img from "../../UI/Img";
import ImageInput from "../../UI/InputsBase/ImageInput";
import TitleUser from "../../UI/Texts/TitleUser";
import InputCounter from "../../UI/InputsBase/InputCounter";
import SeparateModal from "../../UI/Modal/SeparateModal";
import ButtonWideModal from "../../UI/Modal/ButtonWideModal";
import profileIcon from '../../assets/icons/profile-blue.png'
import Button from "../../UI/ButtonsBase/Button";
import TemporaryError from "../../UI/Errors/TemporaryError";
import UpdateFieldModal from "./UpdateFieldModal";
import {loginRule} from "../../utils/validationRules";
import {IRoomUpdates} from "../../models/IRoomUpdates";
import {IRoom, ParticipantStatuses} from "../../models/IRoom";
import Checkbox from "../../UI/InputsBase/Checkbox";
import basketIcon from "../../assets/icons/basket.png";
import groupIcon from "../../assets/icons/group-purple.png";
import addIcon from "../../assets/icons/user-add.png";
import blockIcon from "../../assets/icons/block.png";
import Error from "../../UI/Errors/Error";
import roomIcon from '../../assets/icons/group-base.png'
import UsersListModal from "./UsersListModal";
import {getLength} from "../../utils/getLength";
import {getUsersForUsersList} from "../../utils/getUsersForUsersList";

interface EditProfileModalProps extends HTMLAttributes<HTMLDivElement> {
  closeModal: () => void
  updateRoom: (updates: IRoomUpdates) => void
  room: IRoom
  error?: string
  resetError: () => void
  removeRoom: () => void
  removeAdminStatus: (uid: string) => void
  addAdminStatus: (uid: string) => void
  blockUser: (uid: string) => void
  unblockUser: (uid: string) => void
  acceptApplication: (uid: string) => void
  rejectApplication: (uid: string) => void
  rejectAndBlockApplication: (uid: string) => void
  removeUser: (uid: string) => void
}

const EditProfileModal: FC<EditProfileModalProps> = ({removeUser, removeAdminStatus, addAdminStatus, blockUser, unblockUser, acceptApplication, rejectApplication, rejectAndBlockApplication, closeModal, error, resetError, removeRoom, room, updateRoom}) => {
  const [titleVisible, setTitleVisible] = useState(false)
  const [membersVisible, setMembersVisible] = useState(false)
  const [applicationsVisible, setApplicationsVisible] = useState(false)
  const [blockedVisible, setBlockedVisible] = useState(false)

  const [bio, setBio] = useState(room.descriptions || '')

  function updateAvatar(img: null | string) {
    updateRoom({photo: img})
  }

  function updateBio() {
    updateRoom({descriptions: bio})
  }

  function updateName(newTitle: string) {
    updateRoom({title: newTitle})
    setTitleVisible(false)
  }

  function setBioHandle(e: ChangeEvent<HTMLInputElement>) {
    const newBio = e.target.value
    if (newBio.length <= 70) {
      setBio(newBio)
    }
  }

  function setIsPrivateHandle() {
    updateRoom({isPrivate: !room.isPrivate})
  }

  function removeRoomHandle() {
    if (window.confirm('Вы действительно хотите удалить комнату: ' + room.title)) {
      removeRoom()
    }
  }

  const modal = () => {
    if (membersVisible) {
      return <UsersListModal popupButtons={[
        {needShowProfile: true, dontFadeAfter: true},
        {text: 'Назначить администратором', onClick: addAdminStatus, confirmText: 'Вы действительно хотите назначить администратором этого пользователя?'},
        {text: 'Заблокировать', onClick: blockUser, confirmText: 'Вы действительно хотите заблокировать этого пользователя?'},
        {text: 'Исключить', onClick: removeUser, confirmText: 'Вы действительно хотите исключить этого пользователя?'},
      ]} users={getUsersForUsersList(room.participants)} title={'Участники'} closeModal={closeModal} back={() => setMembersVisible(false)}/>
    }
    if (applicationsVisible) {
      return <UsersListModal popupButtons={[
        {text: 'Заблокировать', onClick: rejectAndBlockApplication},
        {needShowProfile: true, dontFadeAfter: true},
        {text: 'Добавить', onClick: acceptApplication},
        {text: 'Отклонить', onClick: rejectApplication},
      ]}  users={getUsersForUsersList(room.applications)} title={'Заявки'} closeModal={closeModal} back={() => setApplicationsVisible(false)}/>
    }
    if(blockedVisible){
      return <UsersListModal popupButtons={[
        {needShowProfile: true, dontFadeAfter: true},
        {text: 'Разблокировать', onClick: unblockUser, confirmText: 'Вы действительно хотите разблокировать этого пользователя?'},
      ]}  users={getUsersForUsersList(room.blockedList)} title={'Чёрный список'} closeModal={closeModal} back={() => setBlockedVisible(false)}/>
    }
    return <Error>Nested modal was used incorrectly</Error>
  }

  return (
    membersVisible || applicationsVisible || blockedVisible
      ? modal()
      : <Modal closeModal={closeModal}>
        {titleVisible &&
          <UpdateFieldModal rules={loginRule} closeModal={() => setTitleVisible(false)} title={'Изменить название группы'}
                            label={'Новое название'} updateField={updateName}/>}
        {error && <TemporaryError time={3000} resetError={resetError}>{error}</TemporaryError>}
        <HeaderModal>
          <TitleModal>Редактирование группы</TitleModal>
          <ActionsHeaderModal>
            <ButtonCrossIcon indent
                             alt={'close'}
                             onClick={closeModal}/>
          </ActionsHeaderModal>
        </HeaderModal>
        <MainModal>
          <div className="edit__preview">
            <div className="edit__avatar-box">
              <Img className="edit__avatar" photoData={room.photoURL}
                   src={room.photoURL || roomIcon}/>
              <ImageInput photoUrl={null} setPhotoUrl={updateAvatar} className="edit__reset-avatar"/>
            </div>
            <TitleUser>{room.title}</TitleUser>
          </div>
          <div className="edit__descriptions">
            <InputCounter placeholder={'Bio'} maxCount={70} value={bio} onChange={setBioHandle}/>
            {bio !== room.descriptions
              && <Button onClick={updateBio} className={'edit__descriptions-save'}>Обновить описание</Button>}
          </div>
          <SeparateModal/>
          <div className="edit-room__private">
            <p>Приватная группа:</p>
            <Checkbox checked={room.isPrivate} onChange={setIsPrivateHandle}/>
          </div>
          <SeparateModal/>
          <div className="edit__actions">
            <ButtonWideModal onClick={() => setTitleVisible(true)} iconSide={'22px'} icon={profileIcon}
                             label={room.title}>Название</ButtonWideModal>
            <ButtonWideModal onClick={() => setMembersVisible(true)} iconSide={'22px'}
                             icon={groupIcon} label={`${getLength(room.participants)}`}>Участники</ButtonWideModal>
            <ButtonWideModal onClick={() => setBlockedVisible(true)} iconSide={'22px'}
                             icon={blockIcon} label={`${getLength(room.blockedList)}`}>Чёрный список</ButtonWideModal>
            {room.isPrivate &&
              <ButtonWideModal onClick={() => setApplicationsVisible(true)} iconSide={'22px'}
                               icon={addIcon} label={`${getLength(room.applications)}`}>Заявки на вступление</ButtonWideModal>}
          </div>
          <SeparateModal/>
          <div className="edit__exit">
            <ButtonWideModal onClick={removeRoomHandle} icon={basketIcon}>Удалить группу</ButtonWideModal>
          </div>
        </MainModal>
      </Modal>
  );
};

export default EditProfileModal;