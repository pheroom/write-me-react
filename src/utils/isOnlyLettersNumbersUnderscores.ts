export function isOnlyLettersNumbersUnderscores(str: string){
  const re = /^\w+$/
  return re.test(String(str).toLowerCase())
}