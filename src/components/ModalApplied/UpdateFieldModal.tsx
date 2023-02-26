import React, {FC, FormEvent} from 'react';
import HeaderModal from "../../UI/Modal/HeaderModal";
import TitleModal from "../../UI/Modal/TitleModal";
import InputLabeled from "../../UI/InputsBase/InputLabeled";
import Button from "../../UI/ButtonsBase/Button";
import Modal from "../../UI/Modal/Modal";
import {IValidations, useInput} from "../../hooks/useInput";
import FooterButtonsModal from "../../UI/Modal/FooterButtonsModal";
import {freeRule} from "../../utils/validationRules";

interface UpdateFieldModalProps{
  closeModal: () => void
  updateField?: (data: string) => void
  updateFields?: (data: string, otherData: string) => void
  title: string
  label: string
  otherLabel?: string
  rules?: IValidations
}

const UpdateFieldModal: FC<UpdateFieldModalProps> = ({closeModal, title, rules, label, otherLabel, updateFields, updateField}) => {

  const field = useInput('', rules || freeRule)

  const otherField = useInput('', rules || freeRule)

  function updateFieldHandle(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(otherLabel && updateFields){
      updateFields(field.value, otherField.value)
    } else if(updateField){
      updateField(field.value)
    } else {
      console.log(field.value)
    }
  }

  return (
    <Modal positionCenter widthFromContent className={'update-field'} closeModal={closeModal}>
      <HeaderModal>
        <TitleModal unindent className={'update-field__title'}>{title}</TitleModal>
      </HeaderModal>
      <form onSubmit={updateFieldHandle}>
        <InputLabeled
          autoFocus
          boxClassName={'update-field__input'}
          label={label}
          value={field.value}
          error={field.isDirty && !field.inputValid}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
        {otherLabel && <InputLabeled
          boxClassName={'update-field__other-input'}
          label={otherLabel}
          value={otherField.value}
          error={otherField.isDirty && !otherField.inputValid}
          onChange={otherField.onChange}
          onBlur={otherField.onBlur}
        />}
        <FooterButtonsModal topIndent>
          <Button type={'button'} onClick={closeModal}>
            Отмена
          </Button>
          <Button type={'submit'} disabled={otherLabel ? (!field.inputValid || !otherField.inputValid) : !field.inputValid}>
            Сохранить
          </Button>
        </FooterButtonsModal>
      </form>
    </Modal>
  );
};

export default UpdateFieldModal;