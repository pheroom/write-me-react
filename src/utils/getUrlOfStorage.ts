const basePath = 'https://firebasestorage.googleapis.com/v0/b/writeme-37420.appspot.com/o/'

export function getUrlOfStorage(path: string){
  while (path.includes('/')){
    path = path.replace('/', '%2F')
  }
  return basePath + path + '?alt=media'
}