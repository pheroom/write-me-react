import React, {FC, HTMLAttributes} from 'react';
import Modal from "../../UI/Modal/Modal";
import ImageInput from "../../UI/InputsBase/ImageInput";
import InputUnderlined from "../../UI/InputsBase/InputUnderlined";
import {IRoom} from "../../models/IRoom";
import {useNameInput} from "../../UI/useNameInput";
import {useCheckbox} from "../../UI/useCheckbox";
import {createRoom} from "../../store/RoomsReducers/RoomsActionCreators";
import {useAppDispatch} from "../../store";

interface CreateRoomModalProps extends HTMLAttributes<HTMLDivElement> {
  closeModal: () => void
  createRoom: (title: string, isPrivate: boolean) => void
}

const CreateRoomModal: FC<CreateRoomModalProps> = ({closeModal, createRoom, }) => {
  const {nameInput, name} = useNameInput('')
  const {checkbox, checkboxInput} = useCheckbox(false)

  function createRoomHandle(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    createRoom(name.value, checkbox.value)
    name.setValue('')
    checkbox.setStatus(false)
    closeModal()
  }

  return (
    <Modal closeModal={closeModal}>
      <div className="create-room__form">
        <ImageInput size={'large'}/>
        {nameInput}
        {checkboxInput}
      </div>
    </Modal>
  );
};

export default CreateRoomModal;