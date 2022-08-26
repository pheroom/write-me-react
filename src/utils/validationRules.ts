export const freeRule = {
  isFree: true
}

export const loginRule = {
  minLength: 3,
  maxLength: 16,
  isEmpty: false,
  isNotLettersNumUnder: false
}

export const passwordRule = {
  minLength: 6,
  maxLength: 30,
  isEmpty: false,
  isNotLettersNumUnder: false
}

export const emailRule = {
  isEmpty: false,
  isNotEmail: false,
  maxLength: 36,
}

export const nameRule = {
  isEmpty: false,
  minLength: 1,
  maxLength: 20,
}

export const phoneRule = {
  isFree: true,
  isEmpty: true,
  minLength: 9,
  maxLength: 20,
}
