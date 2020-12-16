export function isLTR(): boolean {
  let dir: string = 'ltr';

  if (typeof window !== 'undefined') {
    if (window.getComputedStyle) {
      dir = window.getComputedStyle(document.body, null).getPropertyValue('direction');
    } else {
      dir = (document.body as any).currentStyle.direction;
    }
  }

  return dir === 'ltr';
}

export function isIOS(): boolean {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  }

  return false;
}

export function isBrowser(): boolean {
  return new Function('try{return this===window;}catch(e){return false;}')();
}
