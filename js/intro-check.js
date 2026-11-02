// Runs in <head>, before the first paint. It marks that JavaScript is on and decides whether
// the intro plays, so the page never flashes content that the intro is about to cover.
// The intro plays once per browser session, and never with reduced motion or ?skip-intro.
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const skipRequested = new URLSearchParams(window.location.search).has('skip-intro');
  let seenThisSession = false;
  try {
    seenThisSession = window.sessionStorage.getItem('intro-seen') === '1';
  } catch {
    // Storage can be blocked (private mode, strict settings). The intro just plays again.
  }

  if (!seenThisSession && !reduceMotion && !skipRequested) root.classList.add('is-intro');
})();
