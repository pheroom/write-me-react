import React, {FC, HTMLAttributes, useState} from 'react';
import Modal from "../../UI/Modal/Modal";
import ImageInput from "../../UI/InputsBase/ImageInput";
import InputUnderlined from "../../UI/InputsBase/InputUnderlined";
import Button from "../../UI/ButtonsBase/Button";
import Checkbox from "../../UI/InputsBase/Checkbox";
import FooterButtonsModal from "../../UI/Modal/FooterButtonsModal";

interface CreateRoomModalProps extends HTMLAttributes<HTMLDivElement> {
  closeModal: () => void
  createRoom: (title: string, isPrivate: boolean, photoUrl: string | null) => void
}

const CreateRoomModal: FC<CreateRoomModalProps> = ({closeModal, createRoom, }) => {
  const [name, setName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [photoUrl, setPhotoUrl] = useState<null | string>(null)

  function createRoomHandle(){
    if(name){
      createRoom(name, isPrivate, photoUrl)
      setName('')
      setIsPrivate(false)
      closeModal()
    }
  }

  return (
    <Modal closeModal={closeModal} className="create-room" widthFromContent positionCenter>
      <div className="create-room__form">
          <ImageInput size={'large'} photoUrl={photoUrl} setPhotoUrl={setPhotoUrl}/>
          <div className="create-room__inputs">
            <div className="create-room__name-box">
              <p className={'create-room__name-label'}>Room name</p>
              <InputUnderlined value={name} onChange={e => setName(e.target.value)} placeholder={'Room name'} className={'create-room__name-input'}/>
            </div>
            <div className="create-room__private">
              <p className={'create-room__private-label'}>Create a private room</p>
              <Checkbox checked={isPrivate} onChange={() => setIsPrivate(prev => !prev)}/>
            </div>
          </div>
      </div>
      <FooterButtonsModal>
        <Button onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={createRoomHandle}>
          Create
        </Button>
      </FooterButtonsModal>
    </Modal>
  );
};

export default CreateRoomModal;