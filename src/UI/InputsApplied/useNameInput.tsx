import {useInput} from "../../hooks/useInput";
import React from "react";
import {nameRule} from "../../utils/validationRules";
import InputUnderlined from "../InputsBase/InputUnderlined";
import LabelError from "../LabelError";

export const useNameInput = (value: string, ...args: any[]) => {
  const name = useInput(value, nameRule)

  const nameInput = <div>
    {(name.isDirty && name.isEmpty) && <LabelError>is empty</LabelError>}
    {(name.isDirty && !name.isEmpty && name.isMinLength) && <LabelError>min length</LabelError>}
    {(name.isDirty && name.isMaxLength) && <LabelError>max length</LabelError>}
    <InputUnderlined
      error={name.isDirty && !name.inputValid}
      value={name.value}
      onChange={name.onChange}
      onBlur={name.onBlur}
      placeholder={'Имя'}
      {...args}
    />
  </div>

  return {nameInput, name}
}