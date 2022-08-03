import {useInput} from "../hooks/useInput";
import React from "react";
import {emailRule} from "../utils/validationRules";

export const useEmailInput = (value: string, ...args: any[]) => {
  const email = useInput(value, emailRule)

  const emailInput = <div>
    {(email.isDirty && email.isEmpty) && <div>is empty</div>}
    {(email.isDirty && email.isMaxLength) && <div>max length</div>}
    {(email.isDirty && email.isNotEmail) && <div>is not email</div>}
    <input
      type="text"
      value={email.value}
      onChange={email.onChange}
      onBlur={email.onBlur}
      placeholder={'Электронная почта'}
      {...args}
    />
  </div>

  return {emailInput, email}
}