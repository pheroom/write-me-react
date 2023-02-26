import React, {FC} from 'react';
import Modal from "../../UI/Modal/Modal";
import ButtonWideModal from "../../UI/Modal/ButtonWideModal";
import {IPopupButton} from "../../models/IPopupButton";

const ButtonPopup = (
  {button, showProfile, data, closeModal}: {
    button: IPopupButton,
    showProfile?: () => void,
    data?: string,
    closeModal: () => void
  }
) => {
  if(button.needShowProfile && showProfile){
    return <ButtonWideModal alignText={'center'} onClick={showProfile}>Показать профиль</ButtonWideModal>
  }
  const onClickHandle = () => {
    const action = () => {
      button.onClick && button.onClick(data || '')
      !button.dontFadeAfter && closeModal()
    }
    if(button.confirmText){
      if(window.confirm(button.confirmText)){
        action()
      }
    } else {
      action()
    }
  }
  return <ButtonWideModal alignText={'center'} onClick={onClickHandle}>{button.text || 'Нажать'}</ButtonWideModal>
}

interface PopupProps{
  buttons: IPopupButton[]
  data?: any
  showProfile?: () => void
  closeModal: () => void
}

const Popup: FC<PopupProps> = ({buttons, closeModal, data, showProfile}) => {
  return (
    <Modal closeModal={closeModal} className="choice-popup" widthFromContent positionCenter>
      {buttons.map((button, index) =>
        <ButtonPopup key={index} closeModal={closeModal} button={button} showProfile={showProfile} data={data}/>
      )}
    </Modal>
  );
};

export default Popup;