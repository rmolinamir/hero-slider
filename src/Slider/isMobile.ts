export const isMobile = (): boolean => {
  // Detect if running on the browser:
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser) {
    if (navigator && /Mobi|Android/i.test(navigator.userAgent)) {
      return true
    }
    return false
  }
  return false
}
