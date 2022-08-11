import {useInput} from "../hooks/useInput";
import React from "react";
import {nameRule} from "../utils/validationRules";

export const useNameInput = (value: string, ...args: any[]) => {
  const name = useInput(value, nameRule)

  const nameInput = <div>
    {(name.isDirty && name.isEmpty) && <div>is empty</div>}
    {(name.isDirty && !name.isEmpty && name.isMinLength) && <div>min length</div>}
    {(name.isDirty && name.isMaxLength) && <div>max length</div>}
    <input
      type="text"
      value={name.value}
      onChange={name.onChange}
      onBlur={name.onBlur}
      placeholder={'Имя'}
      {...args}
    />
  </div>

  return {nameInput, name}
}