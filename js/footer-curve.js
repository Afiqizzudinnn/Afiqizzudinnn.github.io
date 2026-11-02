/**
 * The white page edge above the footer is curved, and flattens as the footer scrolls into view.
 */

const MAX_CURVE_PX = 120;

export function initFooterCurve(curve) {
  if (!curve) return;
  const footer = curve.parentElement;
  let queued = false;

  const update = () => {
    queued = false;
    const top = footer.getBoundingClientRect().top;
    // 0 when the footer is just below the screen, 1 once its top reaches the middle of the screen.
    const progress = Math.min(Math.max((window.innerHeight - top) / (window.innerHeight / 2), 0), 1);
    curve.style.setProperty('--curve', `${Math.round((1 - progress) * MAX_CURVE_PX)}px`);
  };

  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
}
