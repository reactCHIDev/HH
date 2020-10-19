export const setDefaultFavicons = () => {
  const link = document.getElementsByClassName('favicon-icons')
  const baseUrl = window.location.origin.toString()

  link[0].href = `${baseUrl}/icons/_favicon-192x192.png`
  link[1].href = `${baseUrl}/icons/_favicon-16x16.png`
  link[2].href = `${baseUrl}/icons/_favicon-32x32.png`
  link[3].href = `${baseUrl}/icons/_favicon-512x512.png`
}

export const setFavicons = (base64Favicon) => {
  const link = document.getElementsByClassName('favicon-icons')

  if (base64Favicon) {
    for (let i = 0; i < link?.length; i++) {
      link[i].href = base64Favicon
    }
  }
}
