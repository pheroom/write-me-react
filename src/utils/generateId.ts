export function generateIdByRandom(){
  return Math.random().toString(16).slice(2)
}

export function generateIdByDate(){
  return (new Date()).getTime()
}