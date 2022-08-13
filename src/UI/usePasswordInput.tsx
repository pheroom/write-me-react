import {useInput} from "../hooks/useInput";
import React, {useState} from "react";
import {passwordRule} from "../utils/validationRules";
import Input from "./Input";
import viewDisabled from '../assets/icons/view-grey.png'
import viewActive from '../assets/icons/view-blue.png'

export const usePasswordInput = (value: string, ...args: any[]) => {
  const password = useInput(value, passwordRule)
  const [visible, setVisible] = useState(true)

  const passwordInput = <div>
    {(password.isDirty && password.isEmpty) && <div>is empty</div>}
    {(password.isDirty && !password.isEmpty && password.isMinLength) && <div>min length</div>}
    {(password.isDirty && password.isMaxLength) && <div>max length</div>}
    <div className={'password-input'}>
      <Input
        type={visible ? 'text' : 'password'}
        value={password.value}
        onChange={password.onChange}
        onBlur={password.onBlur}
        placeholder={'Пароль'}
        {...args}
      />
      <img className={'password-input__view'} src={visible ? viewActive : viewDisabled} onClick={() => setVisible(prev => !prev)} alt={visible ? 'не показывать' : 'показывать'}/>
    </div>
  </div>

  return {passwordInput, password}
}