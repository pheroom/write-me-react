import {useInput} from "../../hooks/useInput";
import React from "react";
import {emailRule} from "../../utils/validationRules";
import InputUnderlined from "../InputsBase/InputUnderlined";
import LabelError from "../LabelError";

export const useEmailInput = (value: string, className?: string, boxClassName?: string) => {
  const email = useInput(value, emailRule)

  const emailInput = <div className={boxClassName}>
    <InputUnderlined
      value={email.value}
      error={email.isDirty && !email.inputValid}
      onChange={email.onChange}
      onBlur={email.onBlur}
      placeholder={'Электронная почта'}
      className={className}
    />
    {(email.isDirty && email.isEmpty) && <LabelError>Почта не укказана</LabelError>}
    {(email.isDirty && email.isMaxLength) && <LabelError>Почта слишком длинная</LabelError>}
    {(!email.isEmpty && email.isDirty && email.isNotEmail) && <LabelError>Почта не подходит</LabelError>}
  </div>

  return {emailInput, email}
}