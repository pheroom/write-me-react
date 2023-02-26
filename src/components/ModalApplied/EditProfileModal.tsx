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
import emailIcon from '../../assets/icons/email.png'
import passwordIcon from '../../assets/icons/password.png'
import userAva from '../../assets/icons/user-base.png'
import Button from "../../UI/ButtonsBase/Button";
import TemporaryError from "../../UI/Errors/TemporaryError";
import UpdateFieldModal from "./UpdateFieldModal";
import {emailRule, loginRule, passwordRule, phoneRule} from "../../utils/validationRules";

interface EditProfileModalProps extends HTMLAttributes<HTMLDivElement> {
  closeModal: () => void
  user: IUser
  updateProfile: (updates: IUserUpdates) => void
  changePassword: (updates: {lastPas: string, newPas: string}) => void
  logout: () => void
  error?: string
  resetError: () => void
}

const EditProfileModal: FC<EditProfileModalProps> = ({closeModal, changePassword, resetError, error, logout, user, updateProfile}) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [emailVisible, setEmailVisible] = useState(false)
  const [phoneVisible, setPhoneVisible] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const [bio, setBio] = useState(user.descriptions || '')

  function updateAvatar(img: null | string) {
    updateProfile({photo: img})
  }

  function updateBio() {
    updateProfile({descriptions: bio})
  }

  function updateName(newName: string) {
    updateProfile({displayName: newName})
    setLoginVisible(false)
  }

  function updatePhone(newPhone: string){
    updateProfile({phoneNumber: newPhone})
    setPhoneVisible(false)
  }

  function updateEmail(newEmail: string){
    updateProfile({email: newEmail})
    setEmailVisible(false)
  }

  function updatePassword(lastPas: string, newPas: string){
    changePassword({lastPas, newPas})
    setPasswordVisible(false)
  }

  function setBioHandle(e: ChangeEvent<HTMLInputElement>) {
    const newBio = e.target.value
    if (newBio.length <= 70) {
      setBio(newBio)
    }
  }

  return (
    <Modal closeModal={closeModal}>

      {loginVisible &&
        <UpdateFieldModal rules={loginRule} closeModal={() => setLoginVisible(false)} title={'Редактирование имени'}
                          label={'Новое имя'} updateField={updateName}/>}
      {emailVisible &&
        <UpdateFieldModal rules={emailRule} closeModal={() => setEmailVisible(false)} title={'Редактирование почты'}
                          label={'Новая почта'} updateField={updateEmail}/>}
      {phoneVisible &&
        <UpdateFieldModal rules={phoneRule} closeModal={() => setPhoneVisible(false)} title={'Редактирование телефона'}
                          label={'Новый телефон'} updateField={updatePhone}/>}
      {passwordVisible &&
        <UpdateFieldModal rules={passwordRule} closeModal={() => setPasswordVisible(false)} title={'Изменение пароля'}
                          label={'Старый пароль'} otherLabel={'Новый пароль'} updateFields={updatePassword}/>}

      {error && <TemporaryError time={3000} resetError={resetError}>{error}</TemporaryError>}
      <HeaderModal>
        <TitleModal>Информация</TitleModal>
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
                 src={user.photoURL || userAva}/>
            <ImageInput photoUrl={null} setPhotoUrl={updateAvatar} className="edit__reset-avatar"/>
          </div>
          <TitleUser>{user.displayName}</TitleUser>
        </div>
        <div className="edit__descriptions">
          <InputCounter placeholder={'О себе'} maxCount={70} value={bio} onChange={setBioHandle}/>
          {bio !== user.descriptions
            && <Button onClick={updateBio} className={'edit__descriptions-save'}>Сохранить</Button>}
        </div>
        <SeparateModal/>
        <div className="edit__actions">
          <ButtonWideModal onClick={() => setLoginVisible(true)} iconSide={'22px'} icon={profileIcon}
                           label={user.displayName}>Имя</ButtonWideModal>
          <ButtonWideModal onClick={() => setPhoneVisible(true)} iconSide={'22px'} icon={phoneIcon}
                           label={user.phoneNumber || 'не задан'}>Телефон</ButtonWideModal>
          <ButtonWideModal onClick={() => setEmailVisible(true)} iconSide={'22px'} icon={emailIcon}
                           label={user.email}>Почта</ButtonWideModal>
          <ButtonWideModal onClick={() => setPasswordVisible(true)} iconSide={'22px'} icon={passwordIcon}
                           label={'******'}>Пароль</ButtonWideModal>
        </div>
        <SeparateModal/>
        <div className="edit__exit">
          <ButtonWideModal onClick={logout} icon={exitIcon}>Выйти</ButtonWideModal>
        </div>
      </MainModal>
    </Modal>
  );
};

export default EditProfileModal;