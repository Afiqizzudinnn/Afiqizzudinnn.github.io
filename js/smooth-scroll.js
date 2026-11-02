/* global Lenis */
/**
 * Smooth scrolling with Lenis (loaded from a CDN in index.html), and in-page links that glide
 * to their section. Falls back to normal scrolling when Lenis is missing or motion is reduced.
 *
 * @returns {{ onScroll: (fn: (state: { y: number, velocity: number }) => void) => void, stop: () => void, start: () => void }}
 */
export function initSmoothScroll({ enabled }) {
  const listeners = new Set();
  const notify = (state) => listeners.forEach((listener) => listener(state));
  let lenis = null;

  if (enabled && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', (instance) => notify({ y: instance.scroll, velocity: instance.velocity }));
    const frame = (time) => {
      lenis.raf(time);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  } else {
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      notify({ y, velocity: y - lastY });
      lastY = y;
    }, { passive: true });
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]:not(.skip-link)');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    if (lenis) lenis.scrollTo(target);
    else target.scrollIntoView({ behavior: enabled ? 'smooth' : 'auto' });
  });

  return {
    onScroll: (listener) => listeners.add(listener),
    stop: () => lenis?.stop(),
    start: () => lenis?.start(),
  };
}
