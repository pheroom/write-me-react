import {useInput} from "../hooks/useInput";
import React, {useState} from "react";
import {passwordRule} from "../utils/validationRules";

export const usePasswordInput = (value: string, ...args: any[]) => {
  const password = useInput(value, passwordRule)
  const [visible, setVisible] = useState(true)

  const passwordInput = <div>
    {(password.isDirty && password.isEmpty) && <div>is empty</div>}
    {(password.isDirty && !password.isEmpty && password.isMinLength) && <div>min length</div>}
    {(password.isDirty && password.isMaxLength) && <div>max length</div>}
    <input
      type={visible ? 'text' : 'password'}
      value={password.value}
      onChange={password.onChange}
      onBlur={password.onBlur}
      placeholder={'Пароль'}
      {...args}
    />
  <button type={'button'} onClick={() => setVisible(prev => !prev)}>{visible ? 'не показывать' : 'показывать'}</button>
  </div>

  return {passwordInput, password}
}