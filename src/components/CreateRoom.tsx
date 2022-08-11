import React, {FC} from 'react';
import {useNameInput} from "../UI/useNameInput";
import {useCheckbox} from "../UI/useCheckbox";

interface CreateRoomProps{
  createRoom: (title: string, isPrivate: boolean) => void
}

const CreateRoom: FC<CreateRoomProps> = ({createRoom, }) => {
  const {nameInput, name} = useNameInput('')
  const {checkbox, checkboxInput} = useCheckbox(false)

  function createRoomHandle(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    name.setValue('')
    checkbox.setStatus(false)
    createRoom(name.value, checkbox.value)
  }

  return (
    <form onSubmit={createRoomHandle}>
      {nameInput}
      Создать приватную комноту:
      {checkboxInput}
      <div>
        <button disabled={!name.inputValid} type={'submit'}>Создать комнату</button>
      </div>
    </form>
  );
};

export default CreateRoom;