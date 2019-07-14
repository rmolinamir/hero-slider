export const isMobile = (): boolean => {
  if (navigator && /Mobi|Android/i.test(navigator.userAgent)) {
    return true
  }
  return false
}
