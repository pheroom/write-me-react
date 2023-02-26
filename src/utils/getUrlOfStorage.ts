import {storagePath} from '../firebaseConfig'

export function getUrlOfStorage(path: string){
  while (path.includes('/')){
    path = path.replace('/', '%2F')
  }
  return storagePath + path + '?alt=media'
}