import {useInput} from "../hooks/useInput";
import React, {useState} from "react";
import {passwordRule} from "../utils/validationRules";
import LabelError from "./LabelError";
import PasswordInput from "./PasswordInput";

export const usePasswordInput = (value: string, className?: string, boxClassName?: string) => {
  const password = useInput(value, passwordRule)

  const passwordInput = <div className={boxClassName}>
    <PasswordInput
      className={className}
      error={password.isDirty && !password.inputValid}
      value={password.value}
      onChange={password.onChange}
      onBlur={password.onBlur}
      placeholder={'Пароль'}
    />
    {(password.isDirty && password.isEmpty) && <LabelError>Пароль не указан</LabelError>}
    {(password.isDirty && !password.isEmpty && password.isMinLength) &&
      <LabelError>Пароль слишком короткий</LabelError>}
    {(password.isDirty && password.isMaxLength) && <LabelError>Пароль слишком длинный</LabelError>}
  </div>

  return {passwordInput, password}
}

//<Input
//         type={visible ? 'text' : 'password'}
//         error={password.isDirty && !password.inputValid}
//         value={password.value}
//         onChange={password.onChange}
//         onBlur={password.onBlur}
//         placeholder={'Пароль'}
//         className={'password-input__elem ' + className}
//       />
//<img className={'password-input__view'} src={visible ? viewActive : viewDisabled} onClick={() => setVisible(prev => !prev)} alt={visible ? 'не показывать' : 'показывать'}/>



