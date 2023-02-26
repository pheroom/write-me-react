export function getLength(list: object | undefined | null): number{
  if(!list)
    return 0
  if(list instanceof Array)
    return list.length
  return Object.values(list).length
}