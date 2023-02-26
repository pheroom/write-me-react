import {useInput} from "../../hooks/useInput";
import {loginRule} from "../../utils/validationRules";
import React from "react";
import InputUnderlined from "../InputsBase/InputUnderlined";
import LabelError from "../LabelError";

export const useLoginInput = (value: string, className?: string, boxClassName?: string) => {
  const login = useInput(value, loginRule)

  const loginInput = <div className={boxClassName}>
    <InputUnderlined
      error={login.isDirty && !login.inputValid}
      value={login.value}
      onChange={login.onChange}
      onBlur={login.onBlur}
      placeholder={'Логин'}
      className={className}
    />
    {(login.isDirty && login.isEmpty) && <LabelError>Имя не укказано</LabelError>}
    {(login.isDirty && !login.isEmpty && login.isMinLength) && <LabelError>Имя слишком короткое</LabelError>}
    {(login.isDirty && login.isMaxLength) && <LabelError>Имя слишком длинное</LabelError>}
    {(login.isDirty && !login.isEmpty && login.isNotLettersNumUnder) && <LabelError>Имя содержит некорректные символы</LabelError>}
  </div>

  return {loginInput, login}
}