/**
 * Detecs if on a mobile device.
 */
export const isMobile = (): boolean => {
  // But first, detect if running on the browser in case of SSR:
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    if (navigator && /Mobi|Android/i.test(navigator.userAgent)) return true;
    else return false;
  }
  return false;
};
