export const isMobile = (): boolean => {
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    return true
  }
  return false
}
