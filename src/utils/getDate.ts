export function getDate(mil: number){
  const date = new Date(mil)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`
}

export function getTime(mil: number){
  const date = new Date(mil)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
}