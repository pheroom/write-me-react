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
import {
  acceptApplication,
  blockUser, rejectApplication,
  unblockUser,
  updateParticipant
} from "../../store/RoomReducers/RoomActionCreators";

interface EditProfileModalProps extends HTMLAttributes<HTMLDivElement> {
  closeModal: () => void
  updateRoom: (updates: IRoomUpdates) => void
  room: IRoom
  error?: string
  resetError: () => void
  removeRoom: () => void
}

const EditProfileModal: FC<EditProfileModalProps> = ({closeModal, error, resetError, removeRoom, room, updateRoom}) => {
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
        {needShowProfile: true},
        {text: 'Сделать администратором', onClick: (id: string) => console.log('admin ' + id), confirmText: 'Вы действительно хотите сделать администратором этого пользователя?'},
        {text: 'Заблокировать', onClick: (id: string) => console.log('block ' + id), confirmText: 'Вы действительно хотите заблокировать этого пользователя?'},
        {text: 'Удалить', onClick: (id: string) => console.log('delete ' + id), confirmText: 'Вы действительно хотите удалить этого пользователя?'},
      ]} users={getUsersForUsersList(room.participants)} title={'Участники'} closeModal={closeModal} back={() => setMembersVisible(false)}/>
    }
    if (applicationsVisible) {
      return <UsersListModal popupButtons={[
        {needShowProfile: true},
        {text: 'Добавить', onClick: (id: string) => console.log('add ' + id)},
      ]}  users={getUsersForUsersList(room.applications)} title={'Applications'} closeModal={closeModal} back={() => setApplicationsVisible(false)}/>
    }
    if(blockedVisible){
      return <UsersListModal popupButtons={[
        {needShowProfile: true},
        {text: 'Разблокировать', onClick: (id: string) => console.log('unblock ' + id), confirmText: 'Вы действительно хотите разблокировать этого пользователя?'},
      ]}  users={getUsersForUsersList(room.blockedList)} title={'Blocked'} closeModal={closeModal} back={() => setBlockedVisible(false)}/>
    }
    return <Error>Nested modal was used incorrectly</Error>
  }

  return (
    membersVisible || applicationsVisible || blockedVisible
      ? modal()
      : <Modal closeModal={closeModal}>
        {titleVisible &&
          <UpdateFieldModal rules={loginRule} closeModal={() => setTitleVisible(false)} title={'Edit room`s title'}
                            label={'New name'} updateField={updateName}/>}
        {error && <TemporaryError time={3000} resetError={resetError}>{error}</TemporaryError>}
        <HeaderModal>
          <TitleModal>Edit Room</TitleModal>
          <ActionsHeaderModal>
            <ButtonCrossIcon indent
                             alt={'close'}
                             onClick={closeModal}/>
          </ActionsHeaderModal>
        </HeaderModal>
        <MainModal>
          <div className="edit__preview">
            <div className="edit__avatar-box">
              <Img className="edit__avatar"
                   src={room.photoURL || roomIcon}/>
              <ImageInput photoUrl={null} setPhotoUrl={updateAvatar} className="edit__reset-avatar"/>
            </div>
            <TitleUser>{room.title}</TitleUser>
          </div>
          <div className="edit__descriptions">
            <InputCounter placeholder={'Bio'} maxCount={70} value={bio} onChange={setBioHandle}/>
            {bio !== room.descriptions
              && <Button onClick={updateBio} className={'edit__descriptions-save'}>Save Bio</Button>}
          </div>
          <SeparateModal/>
          <div className="edit-room__private">
            <p>Room is private:</p>
            <Checkbox checked={room.isPrivate} onChange={setIsPrivateHandle}/>
          </div>
          <SeparateModal/>
          <div className="edit__actions">
            <ButtonWideModal onClick={() => setTitleVisible(true)} iconSide={'22px'} icon={profileIcon}
                             label={room.title}>Title</ButtonWideModal>
            <ButtonWideModal onClick={() => setMembersVisible(true)} iconSide={'22px'}
                             icon={groupIcon} label={`${getLength(room.participants)}`}>Members</ButtonWideModal>
            <ButtonWideModal onClick={() => setBlockedVisible(true)} iconSide={'22px'}
                             icon={blockIcon} label={`${getLength(room.blockedList)}`}>Blocked users</ButtonWideModal>
            {room.isPrivate &&
              <ButtonWideModal onClick={() => setApplicationsVisible(true)} iconSide={'22px'}
                               icon={addIcon} label={`${getLength(room.applications)}`}>Applications</ButtonWideModal>}
          </div>
          <SeparateModal/>
          <div className="edit__exit">
            <ButtonWideModal onClick={removeRoomHandle} icon={basketIcon}>Remove room</ButtonWideModal>
          </div>
        </MainModal>
      </Modal>
  );
};

export default EditProfileModal;