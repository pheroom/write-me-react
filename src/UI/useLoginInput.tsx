import {useInput} from "../hooks/useInput";
import {loginRule} from "../utils/validationRules";
import React from "react";

export const useLoginInput = (value: string, ...args: any[]) => {
  const login = useInput(value, loginRule)

  const loginInput = <div>
    {(login.isDirty && login.isEmpty) && <div>is empty</div>}
    {(login.isDirty && !login.isEmpty && login.isMinLength) && <div>min length</div>}
    {(login.isDirty && login.isMaxLength) && <div>max length</div>}
    {(login.isDirty && login.isNotLettersNumUnder) && <div>is not only letters and numbers</div>}
    <input
      type="text"
      value={login.value}
      onChange={login.onChange}
      onBlur={login.onBlur}
      placeholder={'Логин'}
      {...args}
    />
  </div>

  return {loginInput, login}
}