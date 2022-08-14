import {useInput} from "../hooks/useInput";
import React, {useState} from "react";
import {passwordRule} from "../utils/validationRules";
import Input from "./Input";
import viewDisabled from '../assets/icons/view-grey.png'
import viewActive from '../assets/icons/view-blue.png'
import LabelError from "./LabelError";

export const usePasswordInput = (value: string, className?: string, boxClassName?: string) => {
  const password = useInput(value, passwordRule)
  const [visible, setVisible] = useState(true)

  const passwordInput = <div className={boxClassName}>
    <div className={'password-input'}>
        <div className={'password-input__inner'}>
          <Input
            type={visible ? 'text' : 'password'}
            error={password.isDirty && !password.inputValid}
            value={password.value}
            onChange={password.onChange}
            onBlur={password.onBlur}
            placeholder={'Пароль'}
            className={'password-input__elem ' + className}
          />
        </div>
      <img className={'password-input__view'} src={visible ? viewActive : viewDisabled} onClick={() => setVisible(prev => !prev)} alt={visible ? 'не показывать' : 'показывать'}/>
    </div>
    {(password.isDirty && password.isEmpty) && <LabelError>Пароль не указан</LabelError>}
    {(password.isDirty && !password.isEmpty && password.isMinLength) && <LabelError>Пароль слишком короткий</LabelError>}
    {(password.isDirty && password.isMaxLength) && <LabelError>Пароль слишком длинный</LabelError>}
  </div>

  return {passwordInput, password}
}