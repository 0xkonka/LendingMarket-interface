export default function goToTop(elementId?: string) {
  window.scroll({
    left: 0,
    top: 0,
    behavior: 'auto',
  });
}
