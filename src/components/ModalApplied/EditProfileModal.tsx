import React, {ChangeEvent, FC, HTMLAttributes, useState} from 'react';
import Modal from "../../UI/Modal/Modal";
import HeaderModal from "../../UI/Modal/HeaderModal";
import TitleModal from "../../UI/Modal/TitleModal";
import ActionsHeaderModal from "../../UI/Modal/ActionsHeaderModal";
import ButtonCrossIcon from "../../UI/ButtonsApplied/ButtonCrossIcon";
import MainModal from "../../UI/Modal/MainModal";
import {IUser} from "../../models/IUser";
import Img from "../../UI/Img";
import ImageInput from "../../UI/InputsBase/ImageInput";
import TitleUser from "../../UI/Texts/TitleUser";
import {IUserUpdates} from "../../models/IUserUpdates";
import InputCounter from "../../UI/InputsBase/InputCounter";
import SeparateModal from "../../UI/Modal/SeparateModal";
import ButtonWideModal from "../../UI/Modal/ButtonWideModal";
import exitIcon from "../../assets/icons/exit.png";
import profileIcon from '../../assets/icons/profile-blue.png'
import phoneIcon from '../../assets/icons/phone.png'

interface EditProfileModalProps extends HTMLAttributes<HTMLDivElement> {
  closeModal: () => void
  user: IUser
  updateProfile: (updates: IUserUpdates) => void
  logout: () => void
}

const EditProfileModal: FC<EditProfileModalProps> = ({closeModal, logout, user, updateProfile}) => {
  const [bio, setBio] = useState('')

  function updateAvatar(img: null | string){
    updateProfile({photo: img})
  }

  function setBioHandle(e: ChangeEvent<HTMLInputElement>){
    const newBio = e.target.value
    setBio(newBio)
    if(newBio.length <= 70){
      setBio(newBio)
    }
  }

  return (
    <Modal closeModal={closeModal}>
      <HeaderModal>
        <TitleModal>Edit Profile</TitleModal>
        <ActionsHeaderModal>
          <ButtonCrossIcon indent
                           alt={'close'}
                           onClick={closeModal}/>
        </ActionsHeaderModal>
      </HeaderModal>
      <MainModal>
        <div className="edit-profile__profile-preview">
          <div className="edit-profile__avatar-box">
            <Img className="edit-profile__avatar" src={user.photoURL || 'https://cdn.ananasposter.ru/image/cache/catalog/poster/mult/95/2266-1000x830.jpg'}/>
            <ImageInput photoUrl={null} setPhotoUrl={updateAvatar} className="edit-profile__reset-avatar"/>
          </div>
          <TitleUser>Suzuya</TitleUser>
        </div>
        <div className="edit-profile__description">
          <InputCounter placeholder={'Bio'} maxCount={70} value={bio} onChange={setBioHandle}/>
        </div>
        <SeparateModal/>
        <div className="edit-profile__actions">
          <ButtonWideModal sideIcon={'22px'} icon={profileIcon}>Name</ButtonWideModal>
          <ButtonWideModal sideIcon={'22px'} icon={phoneIcon}>Phone</ButtonWideModal>
          <ButtonWideModal sideIcon={'22px'} icon={profileIcon}>Email</ButtonWideModal>
          <ButtonWideModal sideIcon={'22px'} icon={profileIcon}>Password</ButtonWideModal>
        </div>
        <SeparateModal/>
        <div className="edit-profile__exit">
          <ButtonWideModal onClick={logout} icon={exitIcon}>Log out</ButtonWideModal>
        </div>
      </MainModal>
    </Modal>
  );
};

export default EditProfileModal;