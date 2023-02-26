import React, {useEffect, useState} from "react";
import {isEmail} from "../utils/isEmail";
import {isOnlyLettersNumbersUnderscores} from "../utils/isOnlyLettersNumbersUnderscores";

export interface IValidations {
  isFree?: boolean
  isEmpty?: boolean
  minLength?: number
  maxLength?: number
  isNotEmail?: boolean
  isNotLettersNumUnder?: boolean
}

const useValidation = (value: string, validations: IValidations) => {
  const [isEmpty, setIsEmpty] = useState(!validations.isEmpty)
  const [isMinLength, setIsMinLength] = useState(false)
  const [isMaxLength, setIsMaxLength] = useState(false)
  const [isNotEmail, setIsNotEmail] = useState(false)
  const [isNotLettersNumUnder, setIsNotLettersNumUnder] = useState(false)

  const [inputValid, setInputValid] = useState(!!validations.isFree)

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          // @ts-ignore
          value.length < validations[validation] ? setIsMinLength(true) : setIsMinLength(false)
          break
        case 'maxLength':
          // @ts-ignore
          value.length > validations[validation] ? setIsMaxLength(true) : setIsMaxLength(false)
          break
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true)
          break
        case 'isNotEmail':
          isEmail(value) ? setIsNotEmail(false) : setIsNotEmail(true)
          break
        case 'isNotLettersNumUnder':
          isOnlyLettersNumbersUnderscores(value) ? setIsNotLettersNumUnder(false) : setIsNotLettersNumUnder(true)
          break
      }
    }
  }, [value])

  useEffect(() => {
    if(!validations.isFree){
      if (isEmpty || isMinLength || isNotEmail || isMaxLength || isNotLettersNumUnder) {
        setInputValid(false)
      } else {
        setInputValid(true)
      }
    }
  }, [isEmpty, isMinLength, isNotEmail, isMaxLength, isNotLettersNumUnder])

  return {
    isEmpty, isMinLength, isNotEmail, isMaxLength, isNotLettersNumUnder, inputValid
  }
}

export const useInput = (initialValue: string, validations: IValidations) => {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setIsDirty] = useState(false)

  const valid = useValidation(value, validations)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsDirty(true)
  }

  return {
    value, onChange, onBlur, isDirty, setValue, ...valid
  }
}