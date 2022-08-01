import React, {useEffect, useState} from "react";
import {isEmail} from "../utils/isEmail";

interface validations {
  isEmpty?: boolean
  minLength?: number
  maxLength?: number
  isNotEmail?: boolean
}

const useValidation = (value: string, validations: validations) => {
  const [isEmpty, setIsEmpty] = useState(true)
  const [isMinLength, setIsMinLength] = useState(false)
  const [isMaxLength, setIsMaxLength] = useState(false)
  const [isNotEmail, setIsNotEmail] = useState(false)

  const [inputValid, setInputValid] = useState(false)

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
      }
    }
  }, [value])

  useEffect(() => {
    if (isEmpty || isMinLength || isNotEmail || isMaxLength) {
      setInputValid(false)
    } else {
      setInputValid(true)
    }
  }, [isEmpty, isMinLength, isNotEmail, isMaxLength])

  return {
    isEmpty, isMinLength, isNotEmail, isMaxLength, inputValid
  }
}

export const useInput = (initialValue: string, validations: object) => {
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
    value, onChange, onBlur, isDirty, ...valid
  }
}