import {useInput} from "../hooks/useInput";
import React from "react";
import {emailRule} from "../utils/validationRules";
import Input from "./Input";
import LabelError from "./LabelError";

export const useEmailInput = (value: string, ...args: any[]) => {
  const email = useInput(value, emailRule)

  const emailInput = <div>
    <Input
      value={email.value}
      error={email.isDirty && !email.inputValid}
      onChange={email.onChange}
      onBlur={email.onBlur}
      placeholder={'Электронная почта'}
      {...args}
    />
    {(email.isDirty && email.isEmpty) && <LabelError>Почта не укказана</LabelError>}
    {(email.isDirty && email.isMaxLength) && <LabelError>Почта слишком длинная</LabelError>}
    {(!email.isEmpty && email.isDirty && email.isNotEmail) && <LabelError>Почта не подходит</LabelError>}
  </div>

  return {emailInput, email}
}