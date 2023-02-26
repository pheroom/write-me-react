import React, {FC, HTMLAttributes, useState} from 'react';
import Modal from "../../UI/Modal/Modal";
import ImageInput from "../../UI/InputsBase/ImageInput";
import InputUnderlined from "../../UI/InputsBase/InputUnderlined";
import Button from "../../UI/ButtonsBase/Button";
import Checkbox from "../../UI/InputsBase/Checkbox";
import FooterButtonsModal from "../../UI/Modal/FooterButtonsModal";
import InputLabeled from "../../UI/InputsBase/InputLabeled";
import {useInput} from "../../hooks/useInput";
import {roomNameRule} from "../../utils/validationRules";

interface CreateRoomModalProps extends HTMLAttributes<HTMLDivElement> {
  closeModal: () => void
  createRoom: (title: string, isPrivate: boolean, photoUrl: string | null) => void
}

const CreateRoomModal: FC<CreateRoomModalProps> = ({closeModal, createRoom, }) => {
  // const [name, setName] = useState('')
  const name = useInput('', roomNameRule)
  const [isPrivate, setIsPrivate] = useState(false)
  const [photoUrl, setPhotoUrl] = useState<null | string>(null)

  function createRoomHandle(){
    if(name.value){
      createRoom(name.value, isPrivate, photoUrl)
      closeModal()
    }
  }

  return (
    <Modal closeModal={closeModal} className="create-room" widthFromContent positionCenter>
      <div className="create-room__form">
          <ImageInput size={'large'} photoUrl={photoUrl} setPhotoUrl={setPhotoUrl}/>
          <div className="create-room__inputs">
            <div className="create-room__name-box">
              <InputLabeled
                autoFocus
                value={name.value}
                onChange={name.onChange}
                onBlur={name.onBlur}
                error={name.isDirty && !name.inputValid}
                label={'Название группы'}
                className={'create-room__name-input'}
              />
            </div>
            <div className="create-room__private">
              <p className={'create-room__private-label'}>Приватная группа</p>
              <Checkbox checked={isPrivate} onChange={() => setIsPrivate(prev => !prev)}/>
            </div>
          </div>
      </div>
      <FooterButtonsModal>
        <Button onClick={closeModal}>
          Отмена
        </Button>
        <Button disabled={!name.inputValid} onClick={createRoomHandle}>
          Создать
        </Button>
      </FooterButtonsModal>
    </Modal>
  );
};

export default CreateRoomModal;