export async function getFileImgFromUrl(url: string) {
  const photoRes = await fetch(url)
  const photoBlob = await photoRes.blob()
  return new File([photoBlob], `image`, {type: "image/png"})
}