export function getMembersLabel(count: number): string{
  if(count >= 5 && count <= 20)
    return "участников"
  let countStr = `${count}`
  let currentCount = +countStr[countStr.length - 1]
  return !currentCount || currentCount > 4 ? "участников" : currentCount === 1 ? "участник" : "участника"
}