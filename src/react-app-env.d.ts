/// <reference types="react-scripts" />

declare module 'react-switch';
// https://github.com/Transak/transak-sdk/issues/7
declare module '@transak/transak-sdk';
declare module '*.mp4' {
  const src: string;
  export default src;
}
